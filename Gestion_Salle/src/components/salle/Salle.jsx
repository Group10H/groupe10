import { useEffect, useState } from 'react'
import { getAllSalles } from '../utils/ApiFunction'
import SalleCard from './SalleCard'
import { Col, Container, Row } from 'react-bootstrap'
import SalleFilter from '../common/SalleFilter'
import SallePaginator from '../common/SallePaginator'

const Salle = () => {
    const [data, setData] = useState([])
	const [error, setError] = useState(null)
	const [isLoading, setIsLoading] = useState(false)
	const [currentPage, setCurrentPage] = useState(1)
	const [sallesPerPage] = useState(6)
	const [filteredData, setFilteredData] = useState([{ id: "" }])
    useEffect(() => {
		setIsLoading(true)
		getAllSalles()
			.then((data) => {
				setData(data)
				setFilteredData(data)
				setIsLoading(false)
			})
			.catch((error) => {
				setError(error.message)
				setIsLoading(false)
			})
	}, [])
    if (isLoading) {
		return <div>Rechargement des salles.....</div>
	}
	if (error) {
		return <div className=" text-danger">Erreur : {error}</div>
	}
    
    const handlePageChange = (pageNumber) => {
		setCurrentPage(pageNumber)
	}
    const totalPages = Math.ceil(filteredData.length / sallesPerPage)
    const renderSalles = () => {
		const startIndex = (currentPage - 1) * sallesPerPage
		const endIndex = startIndex + sallesPerPage
		return filteredData
			.slice(startIndex, endIndex)
			.map((salle) => <SalleCard key={salle.id} salle={salle} />)
	}





  return (
    <Container>
			<Row>
				<Col md={6} className="mb-3 mb-md-0">
					<SalleFilter data={data} setFilteredData={setFilteredData} />
				</Col>

				<Col md={6} className="d-flex align-items-center justify-content-end">
					<SallePaginator
						currentPage={currentPage}
						totalPages={totalPages}
						onPageChange={handlePageChange}
					/>
				</Col>
			</Row>

			<Row>{renderSalles()}</Row>

			<Row>
				<Col md={6} className="d-flex align-items-center justify-content-end">
					<SallePaginator
						currentPage={currentPage}
						totalPages={totalPages}
						onPageChange={handlePageChange}
					/>
				</Col>
			</Row>
		</Container>
  )
}

export default Salle