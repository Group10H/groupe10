import {useEffect, useState} from 'react'
import { getsalletypes } from '../utils/ApiFunction'

const SalleTypeSelector = ({handleSalleInputChange,newsalle}) => {
    const[salleTypes,setSalleTypes]=useState([])
    const[ShowNewSalleTypeInput,setShowNewSalleTypeInput]=useState(false)
    const[newSalleType,setNewSalleType]=useState("")
    useEffect(()=>{
        getsalletypes().then((data)=>{
            setSalleTypes(data)
        })
    }, [])
    const handleNewSalleTypeInputChange=(e)=>{
        setNewSalleType(e.target.value)
    }
    const handleAddNewSalleType=()=>{
        if (newSalleType !== "") {
			setSalleTypes([...salleTypes, newSalleType])
			setNewSalleType("")
			setShowNewSalleTypeInput(false)
		}
    }

  return (
    <>
    {salleTypes.length > 0 && (
        <div>
            <select required className='form-select'  name="salletype" value={newsalle.salleType}
            onChange={(e)=>{
                if(e.target.value=="Add New"){
                    setShowNewSalleTypeInput(true)
                }else{
                    handleSalleInputChange(e)
                }
            }}
            >
                <option value="">Selectioner salle type</option>
				<option value={"Add New"}>Ajouter un nouveau</option>
                {salleTypes.map((type, index)=> (
                    <option key={index} value={type}>
                    {type}
                </option>
                ))}
            </select>
            {ShowNewSalleTypeInput && (
                <div className="mt-2">
                <div className="input-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Entrer un nouveau type"
                        value={newSalleType}
                        onChange={handleNewSalleTypeInputChange}
                    />
                    <button className="btn btn-hotel" type="button" onClick={handleAddNewSalleType}>
                        Ajouter
                    </button>
                </div>
            </div>
            )}
        </div>
    )}
    </>
  )
}

export default SalleTypeSelector