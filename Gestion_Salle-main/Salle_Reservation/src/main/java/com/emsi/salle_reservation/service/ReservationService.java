package com.emsi.salle_reservation.service;

import com.emsi.salle_reservation.model.Reservation;

import java.util.List;
import java.util.Optional;

public interface ReservationService {
    List<Reservation> getAllReservationBySalleId(Long salleid);

    List<Reservation> getAllReservations();

    String saveReservation(Long salleId, Reservation reservationRequest);

    Reservation findByReservationConfirmationCode(String confirmationCode);

    List<Reservation> getReservationByUserEmail(String email);

    void cancelReservation(Long reservationId);
}
