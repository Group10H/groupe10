import React, { useEffect } from 'react'
import { useState } from 'react'
import { deleteSalle, getAllSalles } from '../utils/ApiFunction'
import SalleFilter from '../common/SalleFilter'
import { Col } from 'react-bootstrap'
import SallePaginator from '../common/SallePaginator'
import { FaEdit, FaEye, FaTrashAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const ExistingSalles = () => {
	const [salles, setSalles] = useState([])
	const [currentPage, setCurrentPage] = useState(1)
	const [SallesPerPage] = useState(8)
	const [isLoading, setIsLoading] = useState(false)
	const [filteredSalles, setFilteredSalles] = useState([])
	const [selectedSalleType, setSelectedSalleType] = useState("")
	const [errorMessage, setErrorMessage] = useState("")
	const [successMessage, setSuccessMessage] = useState("")
    useEffect(() => {
		fetchSalles()
	}, [])


    const fetchSalles = async () => {
		setIsLoading(true)
		try {
			const result = await getAllSalles()
			setSalles(result)
			setIsLoading(false)
		} catch (error) {
			setErrorMessage(error.message)
			setIsLoading(false)
		}
	}

    useEffect(() => {
		if (selectedSalleType === "") {
			setFilteredSalles(salles)
		} else {
			const filteredSalles = salles.filter((salle) => salle.salleType === selectedSalleType)
			setFilteredSalles(filteredSalles)
		}
		setCurrentPage(1)
	}, [salles, selectedSalleType])

    const handlePaginationClick = (pageNumber) => {
		setCurrentPage(pageNumber)
	}

	const handleDelete=async(salleId)=>{
		try{
			const result=await deleteSalle(salleId)
			if(result===""){
				setSuccessMessage(`Salle ${salleId} est supprimer`)
				fetchSalles()
			}else{
				console.error(`Erreur suppression salle: ${result.message}`)
			}

		}catch(error){
			setErrorMessage(error.message)
		}

		setTimeout(() => {
			setSuccessMessage("")
			setErrorMessage("")
			
		}, 3000);
	}

    const calculateTotalPages = (filteredSalles, sallesPerPage, salles) => {
		const totalSalles = filteredSalles.length > 0 ? filteredSalles.length : salles.length
		return Math.ceil(totalSalles / sallesPerPage)
	}

    const indexOfLastSalle = currentPage * SallesPerPage
	const indexOfFirstSalle = indexOfLastSalle - SallesPerPage
	const currentSalles = filteredSalles.slice(indexOfFirstSalle, indexOfLastSalle)
    
  return (
    <>
    {isLoading ? (
        <p> rechargement des salles existent</p>
    ):(
        <>
    <section className="mt-5 mb-5 container">
    <div className="d-flex justify-content-between mb-3 mt-5">
        <h2>Salles Existent</h2>
    </div>
        <Col md={6} className="mb-2 md-mb-0">
            <SalleFilter data={salles} setFilteredData={setFilteredSalles} />
        </Col>
        <table className="table table-bordered table-hover">
							<thead>
								<tr className="text-center">
									<th>ID</th>
									<th>Salle Type</th>
									<th>Salle Price</th>
									<th>Actions</th>
								</tr>
							</thead>
                            <tbody>
								{currentSalles.map((salle) => (
									<tr key={salle.id} className="text-center">
										<td>{salle.id}</td>
										<td>{salle.salletype}</td>
										<td>{salle.salleprice}</td>
                                        <td className='gap-2'> 
                                            <Link to={`/edit-salle/${salle.id}`}>
												<span className='btn btn-info btn-sm'><FaEye/> </span>
												<span className='btn btn-warning btn-sm'>  <FaEdit/>  </span>
											</Link>
                                            <button
											className='btn btn-danger btn-sm'
											onClick={()=>handleDelete(salle.id)}
											>
												<FaTrashAlt/>

												</button>
                                        </td>
									</tr>
								))}
							</tbody>
                            </table>
                            <SallePaginator
                            currentPage={currentPage}
                            totalPages={calculateTotalPages(filteredSalles,SallesPerPage,salles)}
                            onPageChange={handlePaginationClick}/>
    




        </section>
</>
)}
        </>


  )
}

export default ExistingSalles