import  { useEffect, useState } from 'react'
import { getSalleById, updateSalle } from '../utils/ApiFunction'
import { Link, useParams } from 'react-router-dom'

const EditSalle = () => {
  const [salle,setSalle]=useState({
    image:null,
    salletype:"",
    salleprix:"",
})


const[imagepreview,setImagePreview]=useState("")
const[successmessage,setsuccessmessage]=useState("")
const[errormessage,seterrormessage]=useState("")
const {salleId}=useParams()

const handleImage=(e)=> {
  const selectedImage=e.target.files[0]
  setSalle({ ...salle,image:selectedImage})
  setImagePreview(URL.createObjectURL(selectedImage))
}

const handleInputChange=(event)=>{
  const {name,value}=event.target
  setSalle({...salle,[name]:value})
}
useEffect(() => {
  const fetchSalle = async () => {
    try {
      const salleData = await getSalleById(salleId)
      setSalle(salleData)
      setImagePreview(salleData.image)
    } catch (error) {
      console.error(error)
    }
  }

  fetchSalle()
}, [salleId])
const handleSubmit = async (e) => {
  e.preventDefault()

  try {
    const response = await updateSalle(salleId, salle)
    if (response.status === 200) {
      setsuccessmessage("salle modifier!")
      const updatedSalleData = await getSalleById(salleId)
      setSalle(updatedSalleData)
      setImagePreview(updatedSalleData.image)
      seterrormessage("")
    } else {
      seterrormessage("Erreur dans modification de salle")
    }
  } catch (error) {
    console.error(error)
    seterrormessage(error.message)
  }
}


return (
  <div className="container mt-5 mb-5">
    <h3 className="text-center mb-5 mt-5">Modifier Salle</h3>
    <div className="row justify-content-center">
      <div className="col-md-8 col-lg-6">
        {successmessage && (
          <div className="alert alert-success" role="alert">
            {successmessage}
          </div>
        )}
        {errormessage && (
          <div className="alert alert-danger" role="alert">
            {errormessage}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="salletype" className="form-label hotel-color">
              Salle Type
            </label>
            <input
              type="text"
              className="form-control"
              id="salletype"
              name="salletype"
              value={salle.salletype}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="salleprice" className="form-label hotel-color">
              Salle Price
            </label>
            <input
              type="number"
              className="form-control"
              id="salleprice"
              name="salleprice"
              value={salle.salleprice}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="image" className="form-label hotel-color">
              Image
            </label>
            <input
              required
              type="file"
              className="form-control"
              id="image"
              name="image"
              onChange={handleImage}
            />
            {imagepreview && (
              <img
                src={`data:image/jpeg;base64,${imagepreview}`}
                alt="Salle preview"
                style={{ maxWidth: "400px", maxHeight: "400" }}
                className="mt-3"
              />
            )}
          </div>
          <div className="d-grid gap-2 d-md-flex mt-2">
            <Link to={"/existing-salles"} className="btn btn-outline-info ml-5">
              back
            </Link>
            <button type="submit" className="btn btn-outline-warning">
              Modifier Salles
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
)
}

export default EditSalle