import { useState } from 'react'
import { addSalle } from '../utils/ApiFunction'
import SalleTypeSelector from '../common/SalleTypeSelector'
const AddSalle = () => {
    const[newsalle,setnewsalle]=useState({
        image:null,
        salletype:"",
        salleprix:"",
    })


    const[imagepreview,SetImagePreview]=useState("")
    const[successmessage,setsuccessmessage]=useState("")
    const[errormessage,seterrormessage]=useState("")

    const handleSalleInputchange=(e)=>{
        const name = e.target.name
        let value=e.target.value
        if(name == "salleprix"){
            if(!isNaN(value)){
            value = parseInt(value)

        }else{
            value = ""
        }
        }
    setnewsalle({...newsalle,[name]:value})
    }

    const handleImage=(e)=> {
        const selectedImage=e.target.files[0]
        setnewsalle({ ...newsalle,image:selectedImage})
        SetImagePreview(URL.createObjectURL(selectedImage))
    }
	
    const handleSubmit=async (e)=>{
        e.preventDefault()
        try {
            const success=await addSalle(newsalle.image, newsalle.salletype, newsalle.salleprix)
            if(success!== undefined){
                setsuccessmessage("une salle est ajouter a la base de donnee")
                setnewsalle({image:null,salletype:"",salleprix:""})
                SetImagePreview("")
                seterrormessage("")
            }else {
                seterrormessage("Erreur dans ajout d'une salle")
            }
        } catch (error) {
            seterrormessage(error.message)
        }
    }

  return (
    <>
			<section className="container mt-5 mb-5">
				<div className="row justify-content-center">
					<div className="col-md-8 col-lg-6">
						<h2 className="mt-5 mb-2">Ajouter une salle</h2>
						{successmessage && (
							<div className="alert alert-success fade show"> {successmessage}</div>
						)}

						{errormessage && <div className="alert alert-danger fade show"> {errormessage}</div>}

						<form onSubmit={handleSubmit}>
							<div className="mb-3">
								<label htmlFor="salletype" className="form-label">
									Salle Type
								</label>
								<div>
									<SalleTypeSelector
										handleSalleInputChange={handleSalleInputchange}
										newsalle={newsalle}
									/>
								</div>
							</div>
							<div className="mb-3">
								<label htmlFor="salleprix" className="form-label">
									Salle Prix
								</label>
								<input
									required
									type="number"
									className="form-control"
									id="salleprix"
									name="salleprix"
									value={newsalle.salleprix}
									onChange={handleSalleInputchange}
								/>
							</div>

							<div className="mb-3">
								<label htmlFor="image" className="form-label">
									Salle Image
								</label>
								<input
									required
									name="image"
									id="image"
									type="file"
									className="form-control"
									onChange={handleImage}
								/>
								{imagepreview && (
									<img
										src={imagepreview}
										alt="Preview  salle image"
										style={{ maxWidth: "400px", maxHeight: "400px" }}
										className="mb-3"></img>
								)}
							</div>
							<div className="d-grid gap-2 d-md-flex mt-2">
								<button type="submit" className="btn btn-outline-primary ml-5">
									entregister Salle
								</button>
							</div>
						</form>
					</div>
				</div>
			</section>
    </>
  )
}

export default AddSalle