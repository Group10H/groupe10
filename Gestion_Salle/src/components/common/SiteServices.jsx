import React from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import Header from "./Header"
import { FaClock, FaParking, FaSnowflake, FaWifi } from 'react-icons/fa'

const SiteServices=()=> {


    
  return (
		<>
			<div className="mb-2">
				<Header title={"Our Services"} />

				<Row className="mt-4">
					<h4 className="text-center">
          Services à <span className="salle-color"> Emsi RS - </span>Reservation
						<span className="gap-2">
							<FaClock className="ml-5" /> Réception ouverte 24h/24
						</span>
					</h4>
				</Row>
				<hr />

				<Row xs={1} md={2} lg={3} className="g-4 mt-2">
					<Col>
						<Card>
							<Card.Body>
								<Card.Title className="salle-color">
									<FaWifi /> WiFi
								</Card.Title>
								<Card.Text>Restez connecté grâce à un accès Internet haut débit.</Card.Text>
							</Card.Body>
						</Card>
					</Col>
					<Col>
						<Card>
							<Card.Body>
								<Card.Title className="salle-color">
									<FaParking/> Parking
								</Card.Title>
								<Card.Text>Garez votre voiture confortablement dans notre parking sur place.</Card.Text>
							</Card.Body>
						</Card>
					</Col>
					<Col>
						<Card>
							<Card.Body>
								<Card.Title className="salle-color">
									<FaSnowflake /> Climatisation
								</Card.Title>
								<Card.Text>Restez au frais et à l'aise avec notre système de climatisation.</Card.Text>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</div>
			<hr />
		</>
	)
}

export default SiteServices