import axios from "axios"

export const api=axios.create({
    baseURL:"http://localhost:8080"
})

export async function addSalle(image,salletype,salleprice){
    const formData=new FormData()
    formData.append("image",image)
    formData.append("salletype", salletype)
    formData.append("salleprice", salleprice)
    
/*add new salle to database */ 
    const response = await api.post("/salles/add/new-salle",formData)
    if(response.status === 201){
        return true
    }else{
        return false
    }

}
/* gets all salle  types from database*/
export async function getsalletypes(){
    try {
        const response=await api.get("/salles/salle-types")
        return response.data
    } catch (error) {
        throw new Error("Error recherche salle types ")
    }

}
/*gets all salles*/
export async function getAllSalles(){
    try {
        const result=await api.get("/salles/all-salles")
        return result.data
    } catch (error) {
        throw new Error("Error recherche salles ")
    }
}
/*delete a salle by id */ 
export async function deleteSalle(salleId){
    try {const result=await api.delete(`/salles/delete/salle/${salleId}`)
    return result.data}catch(error){
        throw new Error(`Error dans la suppression${error.message}`)
    }
}
/*update salle*/
export async function updateSalle(salleId,salleData){
    const formData =new FormData()
    formData.append("salletype",salleData.salletype)
    formData.append("salleprice",salleData.salleprice)
    formData.append("image",salleData.image)
    const response=await api.put(`/salles/update/${salleId}`,formData)
    return response
}
/*gets salle by id */
export async function getSalleById(salleId) {
	try {
		const result = await api.get(`/salles/salle/${salleId}`)
		return result.data
	} catch (error) {
		throw new Error(`Error fetching salle ${error.message}`)
	}
}
/*save a reservation */
export async function reserverSalle(salleId, reservation) {
	try {
		const response = await api.post(`/reservations/salle/${salleId}/reservation`,reservation)
		return response.data
	} catch (error) {
		if (error.response && error.response.data) {
			throw new Error(error.response.data)
		} else {
			throw new Error(`Erreur reservation de salle : ${error.message}`)
		}
	}
}
export async function getAvailableSalles(checkIndate, checkOutdate, salletype) {
	const result = await api.get(`/salles/available-salles?checkIndate=${checkIndate}
		&checkOutdate=${checkOutdate}&salletype=${salletype}`
	)
	return result
}
export async function getAllReservations(){
    try {
        const result=await api.get("/reservations/all-reservations")
        return result.data
        
    } catch (error) {
        throw new Error(`Erreur fetching salles:${error.message}`)
        
    }
}

export async function cancelReservation(reservationId){
    try {
        const result=await api.delete(`/reservations/reservation/${reservationId}/delete`)
        return result.data
    } catch (error) {
        throw Error(`Erreur cancelling reservation :${error.message}`)
        
    }
}

export async function getReservationByConfirmationCode(confirmationcode){
    try {
        const result=await api.get(`/reservations/confirmation/${confirmationcode}`)
        return result.data
        
    } catch (error) {
        if(error.response && error.response.data){
            throw new Error(error.response.data)

        }else{
            throw new Error(`Erreur dans la recherche de reservation:${error.message}`)
        }
    }
}
/*-----register------------*/
export async function registerUser(userData) {
    try {
      const result = await api.post('/users/register', userData);
      return result.data;
    } catch (error) {
      throw error.response.data;
    }
  }
  export async function getUserByEmail(email) {
    try {
      const response = await api.get(`/users/${email}`);
      return response.data; // Assuming the response contains the user data
    } catch (error) {
      throw error.response.data; // Throw an error if the request fails
    }
  }