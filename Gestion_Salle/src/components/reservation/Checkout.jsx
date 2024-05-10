import { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { getSalleById } from '../utils/ApiFunction'
import { FaParking, FaTv, FaUtensils, FaWifi, FaWineGlassAlt } from 'react-icons/fa'
import ReservationForm from './ReservationForm'
import SalleCarousel from '../common/SalleCarousel' 

function Checkout() {
    const [error, setError] = useState(null)
	const [isLoading, setIsLoading] = useState(true)
	const [salleInfo, setSalleInfo] = useState({
		image: "",
		salletype: "",
		salleprice: ""
	})
    
    const {salleId}=useParams()
    
    useEffect(() => {
		setTimeout(() => {
			getSalleById(salleId)
				.then((response) => {
					setSalleInfo(response)
					setIsLoading(false)
				})
				.catch((error) => {
					setError(error)
					setIsLoading(false)
				})
		}, 1000)
	}, [salleId])



    return (
        <div>
        <section className="container">
            <div className="row">
                <div className="col-md-4 mt-5 mb-5">
                    {isLoading ? (
                        <p>Chargement salle information...</p>
                    ) : error ? (
                        <p>{error}</p>
                    ) : (
                        <div className="salle-info">
                            <img
                                src={`data:image/png;base64,${salleInfo.image}`}
                                alt="Salle Image"
                                style={{ width: "100%", height: "200px" }}
                            />
                            <table className="table table-bordered">
                                <tbody>
                                    <tr>
                                        <th>Salle Type:</th>
                                        <td>{salleInfo.salletype}</td>
                                    </tr>
                                    <tr>
                                        <th>Prix par jour:</th>
                                        <td>{salleInfo.salleprice}</td>
                                    </tr>
                                    <tr>
                                        <th>Salle Service:</th>
                                        <td>
                                            <ul className="list-unstyled">
                                                <li>
                                                    <FaWifi /> Wifi
                                                </li>
                                                <li>
                                                    <FaParking /> Parking
                                                </li>
                                            </ul>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
                <div className="col-md-8">
                    <ReservationForm />
                </div>
            </div>
        </section>
        <div className="container">
            <SalleCarousel />
        </div>
    </div>
  )
}

export default Checkout