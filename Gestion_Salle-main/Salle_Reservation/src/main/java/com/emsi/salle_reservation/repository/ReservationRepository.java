package com.emsi.salle_reservation.repository;

import com.emsi.salle_reservation.model.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    
    Optional<Reservation> findByReservationConfirmationCode(String confirmationCode);

    List<Reservation> findByClientEmail(String email);

    List<Reservation> findBySalleId(Long salleid);
}
