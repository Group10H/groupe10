import { useEffect, useState } from 'react'
import { getAllSalles } from '../utils/ApiFunction'
import { Link } from 'react-router-dom'
import { Card,Carousel, Col, Container, Row } from 'react-bootstrap'
const SalleCarousel=()=> {


    const [salles, setSalles] = useState([{ id: "", salletype: "", salleprice: "", image: "" }])
	const [errorMessage, setErrorMessage] = useState("")
	const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
		setIsLoading(true)
		getAllSalles()
			.then((data) => {
				setSalles(data)
				setIsLoading(false)
			})
			.catch((error) => {
				setErrorMessage(error.message)
				setIsLoading(false)
			})
	}, [])
  
    if (isLoading) {
		return <div className="mt-5">chargement Salles....</div>
	}
	if (errorMessage) {
		return <div className=" text-danger mb-5 mt-5">Error : {errorMessage}</div>
	}

  
  
    return (
	<section className="bg-light mb-5 mt-5 shadow">
			<Link to={"/browse-all-salles"} className="salle-color text-center" style={{ textDecoration: 'none' }}>
				<button className='button-12'>parcourir tous les salles </button>
				<br />
			</Link>

			<Container>
				<Carousel indicators={false}>
					{[...Array(Math.ceil(salles.length / 4))].map((_, index) => (
						<Carousel.Item key={index}>
							<Row>
								{salles.slice(index * 4, index * 4 + 4).map((salle) => (
									<Col key={salle.id} className="mb-4" xs={12} md={6} lg={3}>
										<Card>
											<Link to={`/reserver-salle/${salle.id}`}>
												<Card.Img
													variant="top"
													src={`data:image/png;base64, ${salle.image}`}
													alt="Salle Image"
													className="w-100"
													style={{ height: "200px" }}
												/>
											</Link>
											<Card.Body>
												<Card.Title className="hotel-color">{salle.salletype}</Card.Title>
												<Card.Title className="salle-price">${salle.salleprice}/Jour</Card.Title>
												<div className="flex-shrink-0">
													<Link to={`/reserver-salle/${salle.id}`} className="btn btn-hotel btn-sm">
														Reserver!
													</Link>
												</div>
											</Card.Body>
										</Card>
									</Col>
								))}
							</Row>
						</Carousel.Item>
					))}
				</Carousel>
			</Container>
		</section>
  )
}

export default SalleCarousel