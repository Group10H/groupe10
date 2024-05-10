import moment from 'moment'
import React, { useState } from 'react'
import { getAvailableSalles } from '../utils/ApiFunction'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import SalleSearchResults from "./SalleSearchResult"
import SalleTypeSelector from './SalleTypeSelector'


const SalleSearch = () => {
    const [searchQuery, setSearchQuery] = useState({
		checkIndate: "",
		checkOutdate: "",
		salletype: ""
	})
    const [errorMessage, setErrorMessage] = useState("")
	const [availableSalles, setAvailableSalles] = useState([])
	const [isLoading, setIsLoading] = useState(false)
    const handleSearch = (e) => {
		e.preventDefault()
		const checkInMoment = moment(searchQuery.checkIndate)
		const checkOutMoment = moment(searchQuery.checkOutdate)
		if (!checkInMoment.isValid() || !checkOutMoment.isValid()) {
			setErrorMessage("entrer une date valide")
			return
		}
		if (!checkOutMoment.isSameOrAfter(checkInMoment)) {
			setErrorMessage("La date de départ doit être apres la date d'arrivée")
			return
		}
		setIsLoading(true)
		getAvailableSalles(searchQuery.checkIndate, searchQuery.checkOutdate, searchQuery.salletype)
			.then((response) => {
				setAvailableSalles(response.data)
				setTimeout(() => setIsLoading(false), 2000)
			})
			.catch((error) => {
				console.log(error)
			})
			.finally(() => {
				setIsLoading(false)
			})
	}
	const handleSalleInputChange = (e) => {
		const { name, value } = e.target
		setSearchQuery({ ...searchQuery, [name]: value })
		const checkInDate = moment(searchQuery.checkIndate)
		const checkOutDate = moment(searchQuery.checkOutdate)
		if (checkInDate.isValid() && checkOutDate.isValid()) {
			setErrorMessage("")
		}
	}
    const handleClearSearch = () => {
		setSearchQuery({
			checkIndate: "",
			checkOutdate: "",
			salletype: ""
		})
		setAvailableSalles([])
	}














  return (
    <>
			<Container className="shadow mt-n5 mb-5 py-5">
				<Form onSubmit={handleSearch}>
					<Row className="justify-content-center">
						<Col xs={12} md={3}>
							<Form.Group controlId="checkIndate">
								<Form.Label>Check-in Date</Form.Label>
								<Form.Control
									type="date"
									name="checkIndate"
									value={searchQuery.checkIndate}
									onChange={handleSalleInputChange}
									min={moment().format("YYYY-MM-DD")}
								/>
							</Form.Group>
						</Col>
						<Col xs={12} md={3}>
							<Form.Group controlId="checkOutdate">
								<Form.Label>Check-out Date</Form.Label>
								<Form.Control
									type="date"
									name="checkOutdate"
									value={searchQuery.checkOutdate}
									onChange={handleSalleInputChange}
									min={moment().format("YYYY-MM-DD")}
								/>
							</Form.Group>
						</Col>
						<Col xs={12} md={3}>
							<Form.Group controlId="salletype" htmlFor='salletype'>
								<Form.Label>Salle Type</Form.Label>
								<div className="d-flex">
									<SalleTypeSelector
										handleSalleInputChange={handleSalleInputChange}
										newsalle={searchQuery}
									/>
									<Button variant="secondary" type="submit" className="ml-2 button-12 " >
										Recherche
									</Button>
								</div>
							</Form.Group>
						</Col>
					</Row>
				</Form>

				{isLoading ? (
					<p className="mt-4">Recherche de chambres disponibles....</p>
				) : availableSalles ? (
					<SalleSearchResults results={availableSalles} onClearSearch={handleClearSearch} />
				) : (
					<p className="mt-4">Aucune chambre disponible pour les dates et le type de chambre sélectionnés.</p>
				)}
				{errorMessage && <p className="text-danger">{errorMessage}</p>}
			</Container>
		</>
  )
}

export default SalleSearch