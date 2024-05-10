import React, { useState } from 'react'
import { Button, Row } from 'react-bootstrap'
import SallePaginator from './SallePaginator'
import SalleCard from '../salle/SalleCard'





const SalleSearchResult = ({results,onClearSearch}) => {
    const [currentPage, setCurrentPage] = useState(1)
	const resultsPerPage = 3
	const totalResults = results.length
	const totalPages = Math.ceil(totalResults / resultsPerPage)
    const handlePageChange = (pageNumber) => {
		setCurrentPage(pageNumber)
	}
    const startIndex = (currentPage - 1) * resultsPerPage
	const endIndex = startIndex + resultsPerPage
	const paginatedResults = results.slice(startIndex, endIndex)









  return (
    <>
			{results.length > 0 ? (
				<>
					<h5 className="text-center mt-5">Resultats de recherche</h5>
					<Row>
						{paginatedResults.map((salle) => (
							<SalleCard key={salle.id} salle={salle} />
						))}
					</Row>
					<Row>
						{totalResults > resultsPerPage && (
							<SallePaginator
								currentPage={currentPage}
								totalPages={totalPages}
								onPageChange={handlePageChange}
							/>
						)}
						<Button variant="secondary" onClick={onClearSearch}>
							Clear
						</Button>
					</Row>
				</>
			) : (
				<p></p>
			)}
		</>
  )
}

export default SalleSearchResult