import  { useEffect, useState } from 'react'
import { cancelReservation, getAllReservations } from '../utils/ApiFunction'
import Header from '../common/Header'
import ReservationsTable from './ReservationsTable'

function Reservations() {
    const [reservationInfo, setReservationInfo] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState("")


    useEffect(() => {
		setTimeout(() => {
			getAllReservations()
				.then((data) => {
					setReservationInfo(data)
					setIsLoading(false)
				})
				.catch((error) => {
					setError(error.message)
					setIsLoading(false)
				})
		}, 1000)
	}, [])

    const handleReservationCancellation = async (reservationId) => {
		try {
			await cancelReservation(reservationId)
			const data = await getAllReservations()
			setReservationInfo(data)
		} catch (error) {
			setError(error.message)
		}
	}




    return (
        <section style={{ backgroundColor: "whitesmoke" }}>
        <Header title={"Existing Reservations"} />
        {error && <div className="text-danger">{error}</div>}
        {isLoading ? (
            <div>Chargement des reservations existants</div>
        ) : (
            <ReservationsTable
                reservationInfo={reservationInfo}
                handleReservationCancellation={handleReservationCancellation}
            />
        )}
    </section>
  )
}

export default Reservations