import React from 'react'
import { useLocation } from 'react-router-dom'
import Header from '../common/Header'

const ReservationSuccess=()=> {
    const location = useLocation()
	const message = location.state?.message
	const error = location.state?.error

  return (
    <div className="container">
    <Header title="Reservation Success" />
    <div className="mt-5">
        {message ? (
            <div>
                <h3 className="text-success"> Reservation Success!</h3>
                <p className="text-success">{message}</p>
            </div>
        ) : (
            <div>
                <h3 className="text-danger"> Erreur Reservation Salle!</h3>
                <p className="text-danger">{error}</p>
                
            </div>
        )}
    </div>
</div>
  )
}

export default ReservationSuccess