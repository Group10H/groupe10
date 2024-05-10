import { useState } from 'react'
import { cancelReservation, getReservationByConfirmationCode } from '../utils/ApiFunction'
import moment from 'moment'

const FindReservation=()=> {
    const [confirmationCode, setConfirmationCode] = useState("")
	const [error, setError] = useState(null)
	const [successMessage, setSuccessMessage] = useState("")
	const [isLoading, setIsLoading] = useState(false)
    const [reservationInfo, setReservationInfo] = useState({
		id: "",
		reservationConfirmationCode: "",
		salle: { id: "", salletype: "" },
		salleNumber: "",
		checkIndate: "",
		checkOutdate: "",
		clientName: "",
		clientEmail: "",
		numberOfSeats:""
	})
    const emptyReservationInfo = {
		id: "",
		reservationConfirmationCode: "",
		salle: { id: "", salletype: "" },
		salleNumber: "",
		checkIndate: "",
		checkOutdate: "",
		clientName: "",
		clientEmail: "",
		numberOfSeats:""
	}
	const [isDeleted, setIsDeleted] = useState(false)

	const handleInputChange = (event) => {
		setConfirmationCode(event.target.value)
	}


    const handleFormSubmit = async (event) => {
		event.preventDefault()
		setIsLoading(true)

		try {
			const data = await getReservationByConfirmationCode(confirmationCode)
			setReservationInfo(data)
			setError(null)
		} catch (error) {
			setReservationInfo(emptyReservationInfo)
			if (error.response && error.response.status === 404) {
				setError(error.response.data.message)
			} else {
				setError(error.message)
			}
		}

		setTimeout(() => setIsLoading(false), 2000)
	}
    const handleReservationCancellation = async (reservationId) => {
		try {
			await cancelReservation(reservationInfo.reservationid)
			setIsDeleted(true)
			setSuccessMessage("Reservation est annuler!")
			setReservationInfo(emptyReservationInfo)
			setConfirmationCode("")
			setError(null)
		} catch (error) {
			setError(error.message)
		}
		setTimeout(() => {
			setSuccessMessage("")
			setIsDeleted(false)
		}, 2000)
	}








  return (
    <>
    <div className="container mt-5 d-flex flex-column justify-content-center align-items-center">
        <h2 className="text-center mb-4">trouver les reservation</h2>
        <form onSubmit={handleFormSubmit} className="col-md-6">
            <div className="input-group mb-3">
                <input
                    className="form-control"
                    type="text"
                    id="confirmationCode"
                    name="confirmationCode"
                    value={confirmationCode}
                    onChange={handleInputChange}
                    placeholder="Entrer reservation confirmation code"
                />

                <button type="submit" className="btn btn-hotel input-group-text">
                    Trouver Reservation
                </button>
            </div>
        </form>

        {isLoading ? (
            <div>Trouver votre Reservation...</div>
        ) : error ? (
            <div className="text-danger">Erreur: {error}</div>
        ) : reservationInfo.reservationConfirmationCode ? (
            <div className="col-md-6 mt-4 mb-5">
                <h3>Les Information du Reservation</h3>
                <p className="text-success">Confirmation Code: {reservationInfo.reservationConfirmationCode}</p>
                <p> Numero de Salle: {reservationInfo.salle.id}</p>
                <p>salle Type: {reservationInfo.salle.salletype}</p>
                <p>
                    Check-in Date:{" "}
                    {moment(reservationInfo.checkIndate).subtract(1, "month").format("MMM Do, YYYY")}
                </p>
                <p>
                    Check-out Date:{" "}
                    {moment(reservationInfo.checkOutdate).subtract(1, "month").format("MMM Do, YYYY")}
                </p>
                <p>Votre Nom: {reservationInfo.clientName}</p>
                <p>Email Addresse: {reservationInfo.clientEmail}</p>
                <p>numero des places: {reservationInfo.numberOfSeats}</p>

                {!isDeleted && (
                    <button
                        onClick={() => handleReservationCancellation(reservationInfo.id)}
                        className="btn btn-danger">
                        Annuler la reservation
                    </button>
                )}
            </div>
        ) : (
            <div>Recherche des Reservations...</div>
        )}

        {isDeleted && <div className="alert alert-success mt-3 fade show">{successMessage}</div>}
    </div>
</>
)
}

export default FindReservation