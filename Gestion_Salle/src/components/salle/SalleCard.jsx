import React from 'react'
import { Card, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const SalleCard = ({salle}) => {
    return (
        <Col key={salle.id} className="mb-4" xs={12}>
        <Card>
            <Card.Body className="d-flex flex-wrap align-items-center">
                <div className="flex-shrrink-0 mr-3 mb-3 mb-md-0">
                    <Link to={`/reserver-salle/${salle.id}`}>
                        <Card.Img
                            variant="top"
                            src={`data:image/png;base64, ${salle.image}`}
                            alt="salle Image"
                            style={{ width: "100%", maxWidth: "200px", height: "auto" }}
                        />
                    </Link>
                </div>
                <div className="flex-grow-1 ml-3 px-5">
                    <Card.Title className="hotel-color">{salle.salletype}</Card.Title>
                    <Card.Title className="salle-price">{salle.salleprice} / Jour</Card.Title>
                    <Card.Text>information Supplémentaire</Card.Text>
                </div>
                <div className="flex-shrink-0 mt-3">
                    <Link to={`/reserver-salle/${salle.id}`} className="btn btn-hotel btn-sm">
                    Reserve maintenant
                    </Link>
                </div>
            </Card.Body>
        </Card>
    </Col>
  )
}

export default SalleCard