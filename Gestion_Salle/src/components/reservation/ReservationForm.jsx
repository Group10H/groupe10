import  { useEffect, useState } from 'react'
import moment from 'moment'
import { useNavigate, useParams } from 'react-router-dom'
import { getSalleById, reserverSalle } from '../utils/ApiFunction'

import { FormControl,Form } from 'react-bootstrap'
import ReservationSummary from './ReservationSummary'


const ReservationForm=()=> {
    const [validated, setValidated] = useState(false)
	const [isSubmitted, setIsSubmitted] = useState(false)
	const [errorMessage, setErrorMessage] = useState("")
	const [sallePrice, setSallePrice] = useState(0)



    const [reservation, setReservation] = useState({
		clientName: "",
		clientEmail: "",
		checkIndate: "",
		checkOutdate: "",
		numberOfSeats: ""
	})
    const{salleId}=useParams()


    const navigate = useNavigate()


    const handleInputChange = (e) => {
		const { name, value } = e.target
		setReservation({ ...reservation, [name]: value })
		setErrorMessage("")
	}
    const getSallePriceById = async (salleId) => {
		try {
			const response = await getSalleById(salleId)
			setSallePrice(response.salleprice)
		} catch (error) {
			throw new Error(error)
		}
	}
    useEffect(() => {
		getSallePriceById(salleId)
	}, [salleId])


    const calculatePayment = () => {
		const checkInDate = moment(reservation.checkIndate)
		const checkOutDate = moment(reservation.checkOutdate)
		const diffInDays = checkOutDate.diff(checkInDate, "days")
		const paymentPerDay = sallePrice ? sallePrice : 0
		return diffInDays * paymentPerDay
	}

    const isGuestCountValid = () => {
		const numberSeats = parseInt(reservation.numberOfSeats)
		const totalCount = numberSeats
		return totalCount >= 1 
	}
    const isCheckOutDateValid = () => {
		if (!moment(reservation.checkOutdate).isSameOrAfter(moment(reservation.checkIndate))) {
			setErrorMessage("La Date de sortie doie etre apres la Date d'entree")
			return false
		} else {
			setErrorMessage("")
			return true
		}
	}
    const handleSubmit = (e) => {
		e.preventDefault()
		const form = e.currentTarget
		if (form.checkValidity() === false || !isGuestCountValid() || !isCheckOutDateValid()) {
			e.stopPropagation()
		} else {
			setIsSubmitted(true)
		}
		setValidated(true)
	}

    const handleFormSubmit = async () => {
		try {
			const confirmationCode = await reserverSalle(salleId, reservation)
			setIsSubmitted(true)
            console.log(reservation.checkIndate)
			navigate("/reservation-success", { state: { message: confirmationCode } })
		} catch (error) {
			const errorMessage = error.message
			console.log(errorMessage)
			navigate("/reservation-success", { state: { error: errorMessage } })
		}
	}






  
  
  
  
  

    return (
        <>
        <div className="container mb-5">
            <div className="row">
                <div className="col-md-6">
                    <div className="card card-body mt-5">
                        <h4 className="card-title">Reserver Salle</h4>

                        <Form noValidate validated={validated} onSubmit={handleSubmit}>
                            <Form.Group>
                                <Form.Label htmlFor="clientName" className="hotel-color">
                                    Name
                                </Form.Label>
                                <FormControl
                                    required
                                    type="text"
                                    id="clientName"
                                    name="clientName"
                                    value={reservation.clientName}
                                    placeholder="Entrer votre Nom"
                                    onChange={handleInputChange}
                                />
                                <Form.Control.Feedback type="invalid">
                                veuillez entrer votre nom!
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label htmlFor="clientEmail" className="hotel-color">
                                    Email
                                </Form.Label>
                                <FormControl
                                    required
                                    type="email"
                                    id="clientEmail"
                                    name="clientEmail"
                                    value={reservation.clientEmail}
                                    placeholder="Entrer votre email"
                                    onChange={handleInputChange}
                                />
                                <Form.Control.Feedback type="invalid">
                                veuillez entrer votre adresse mail!
                                </Form.Control.Feedback>
                            </Form.Group>

                            <fieldset style={{ border: "2px" }}>
                                <legend>Nombre de Jour </legend>
                                <div className="row">
                                    <div className="col-6">
                                        <Form.Label htmlFor="checkIndate" className="hotel-color">
                                            Check-in date
                                        </Form.Label>
                                        <FormControl
                                            required
                                            type="date"
                                            id="checkIndate"
                                            name="checkIndate"
                                            value={reservation.checkIndate}
                                            placeholder="check-in-date"
                                            min={moment().format("MMM Do, YYYY")}
                                            onChange={handleInputChange}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                        veuillez entrer une date dentree !.
                                        </Form.Control.Feedback>
                                    </div>

                                    <div className="col-6">
                                        <Form.Label htmlFor="checkOutdate" className="hotel-color">
                                            Check-out date
                                        </Form.Label>
                                        <FormControl
                                            required
                                            type="date"
                                            id="checkOutdate"
                                            name="checkOutdate"
                                            value={reservation.checkOutdate}
                                            placeholder="check-out-date"
                                            min={moment().format("MMM Do, YYYY")}
                                            onChange={handleInputChange}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                        veuillez entrer votre date de sortie !.
                                        </Form.Control.Feedback>
                                    </div>
                                    {errorMessage && <p className="error-message text-danger">{errorMessage}</p>}
                                </div>
                            </fieldset>

                            <fieldset style={{ border: "2px" }}>
                                <legend>places</legend>
                                <div className="row">
                                    <div className="col-6">
                                        <Form.Label htmlFor="numberOfSeats" className="hotel-color">
                                        numero des places
                                        </Form.Label>
                                        <FormControl
                                            required
                                            type="number"
                                            id="numberOfSeats"
                                            name="numberOfSeats"
                                            value={reservation.numberOfSeats}
                                            min={1}
                                            placeholder="0"
                                            onChange={handleInputChange}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            minimum une place
                                        </Form.Control.Feedback>
                                    </div>
                                </div>
                            </fieldset>

                            <div className="fom-group mt-2 mb-2">
                                <button type="submit" className="btn btn-hotel">
                                Continuer
                                </button>
                            </div>
                        </Form>
                    </div>
                </div>

                <div className="col-md-4">
                    {isSubmitted && (
                        <ReservationSummary
                            reservation={reservation}
                            payment={calculatePayment()}
                            onConfirm={handleFormSubmit}
                            isFormValid={validated}
                        />
                    )}
                </div>
            </div>
        </div>
    </>
  )
}

export default ReservationForm