import Button  from 'react-bootstrap/Button'
import moment from 'moment'
import  { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ReservationSummary=({reservation,payment,isFormValid,onConfirm})=> {
    const checkInDate = moment(reservation.checkIndate)
	const checkOutDate = moment(reservation.checkOutdate)
	const numberOfDays = checkOutDate.diff(checkInDate, "days")
	const [isReservationConfirmed, setIsReservationConfirmed] = useState(false)
	const [isProcessingPayment, setIsProcessingPayment] = useState(false)
	const navigate = useNavigate()
    const handleConfirmReservation = () => {
		setIsProcessingPayment(true)
		setTimeout(() => {
			setIsProcessingPayment(false)
			setIsReservationConfirmed(true)
			onConfirm()
		}, 3000)
	}
    useEffect(() => {
		if (isReservationConfirmed) {
			navigate("/reservation-success")
		}
	}, [isReservationConfirmed, navigate])
  
  
  
  
  
  
  
  
  
  
  
  
  
  
    return (

        <div className="row">
        <div className="col-md-6"></div>
        <div className="card card-body mt-5">
            <h4 className="card-title hotel-color">Reservation Summary</h4>
            <p>
                Nom: <strong>{reservation.clientName}</strong>
            </p>
            <p>
                Email: <strong>{reservation.clientEmail}</strong>
            </p>
            <p>
                Check-in Date: <strong>{moment(reservation.checkIndate).format("MMM Do YYYY")}</strong>
            </p>
            <p>
                Check-out Date: <strong>{moment(reservation.checkOutdate).format("MMM Do YYYY")}</strong>
            </p>
            <p>
                Nombre de jour reserver: <strong>{numberOfDays}</strong>
            </p>

            <div>
                <h5 className="hotel-color">Nombre des places</h5>
                <strong>
                    <p>Places : {reservation.numberOfSeats}</p>
                </strong>
            </div>

            {payment > 0 ? (
                <>
                    <p>
                        Total paiment: <strong>{payment} DH</strong>
                    </p>

                    {isFormValid && !isReservationConfirmed ? (
                        <Button variant="success" onClick={handleConfirmReservation}>
                            {isProcessingPayment ? (
                                <>
                                    <span
                                        className="spinner-border spinner-border-sm mr-2"
                                        role="status"
                                        aria-hidden="true"></span>
                                    Reservation Confirmer, redireger vers paiment...
                                </>
                            ) : (
                                "Confirmation de reservation et paiment"
                            )}
                        </Button>
                    ) : isReservationConfirmed ? (
                        <div className="d-flex justify-content-center align-items-center">
                            <div className="spinner-border text-primary" role="status">
                                <span className="sr-only">Chargement...</span>
                            </div>
                        </div>
                    ) : null}
                </>
            ) : (
                <p className="text-danger">La Date de sortie doie etre apres la Date d'entree</p>
            )}
        </div>
    </div>
  )
}

export default ReservationSummary