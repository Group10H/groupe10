import React, { useEffect, useState } from 'react'
import DateSlider from '../common/DateSlider'
import { parseISO } from 'date-fns'

const ReservationsTable=({ reservationInfo, handleReservationCancellation })=> {
    const [filteredReservation, setFilteredReservations] = useState(reservationInfo)

	const filterReservations = (startDate, endDate) => {
		let filtered = reservationInfo
		if (startDate && endDate) {
			filtered = reservationInfo.filter((reservation) => {
				const reservationStarDate = parseISO(reservation.checkIndate)
				const reservationEndDate = parseISO(reservation.checkOutdate)
				return (
					reservationStarDate >= startDate && reservationEndDate <= endDate && reservationEndDate > startDate
				)
			})
		}
		setFilteredReservations(filtered)
	}
    useEffect(() => {
		setFilteredReservations(reservationInfo)
	}, [reservationInfo])

  
  
  
  
  
  
  
  
  
  
  
    return (
        <section className="p-4">
        <DateSlider onDateChange={filterReservations} onFilterChange={filterReservations} />
        <table className="table table-bordered table-hover shadow">
            <thead>
                <tr>
                    <th>S/N</th>
                    <th>Reservation ID</th>
                    <th>Salle ID</th>
                    <th>Salle Type</th>
                    <th>Check-In Date</th>
                    <th>Check-Out Date</th>
                    <th>Client Name</th>
                    <th>Client Email</th>
                    <th>Adults</th>
                    <th>Confirmation Code</th>
                    <th colSpan={2}>Actions</th>
                </tr>
            </thead>
            <tbody className="text-center">
                {filteredReservation.map((reservation, index) => (
                    <tr key={reservation.reservationid}>
                        <td>{index + 1}</td>
                        <td>{reservation.reservationid}</td>
                        <td>{reservation.salle.id}</td>
                        <td>{reservation.salle.salletype}</td>
                        <td>{reservation.checkIndate}</td>
                        <td>{reservation.checkOutdate}</td>
                        <td>{reservation.clientName}</td>
                        <td>{reservation.clientEmail}</td>
                        <td>{reservation.numberOfSeats}</td>
                        <td>{reservation.reservationConfirmationCode}</td>
                        <td>
                            <button
                                className="btn btn-danger btn-sm"
                                onClick={() => handleReservationCancellation(reservation.reservationid)}>
                                Annuler
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        {filterReservations.length === 0 && <p> aucun reservation pour la date selectionner</p>}
    </section>
  )
}

export default ReservationsTable