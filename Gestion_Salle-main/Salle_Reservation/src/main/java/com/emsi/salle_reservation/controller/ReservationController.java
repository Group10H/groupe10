package com.emsi.salle_reservation.controller;

import com.emsi.salle_reservation.exception.InvalidReservationRequestException;
import com.emsi.salle_reservation.exception.ResourceNotFoundException;
import com.emsi.salle_reservation.model.Reservation;
import com.emsi.salle_reservation.model.Salle;
import com.emsi.salle_reservation.response.ReservationResponse;
import com.emsi.salle_reservation.response.SalleResponse;
import com.emsi.salle_reservation.service.ReservationService;
import com.emsi.salle_reservation.service.SalleService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin("*")
@RequiredArgsConstructor
@RestController
@RequestMapping("/reservations")
public class ReservationController {
    private final ReservationService reservationService;
    private final SalleService salleService;

    @GetMapping("/all-reservations")
    public ResponseEntity<List<ReservationResponse>> getAllReservations(){
        List<Reservation> reservations = reservationService.getAllReservations();
        List<ReservationResponse> reservationResponses = new ArrayList<>();
        for (Reservation reservation : reservations){
            ReservationResponse reservationResponse = getReservationResponse(reservation);
            reservationResponses.add(reservationResponse);
        }
        return ResponseEntity.ok(reservationResponses);
    }
    @PostMapping("/salle/{salleId}/reservation")
    public ResponseEntity<?> saveReservation(@PathVariable Long salleId,
                                         @RequestBody Reservation reservationRequest){
        try{
            String confirmationCode = reservationService.saveReservation(salleId, reservationRequest);

            return ResponseEntity.ok(
                    "salle reserver avec success votre code :"+confirmationCode);

        }catch (InvalidReservationRequestException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @GetMapping("/confirmation/{confirmationCode}")
    public ResponseEntity<?> getReservationByConfirmationCode(@PathVariable String confirmationCode){
        try{
            Reservation reservation = reservationService.findByReservationConfirmationCode(confirmationCode);
            ReservationResponse reservationResponse = getReservationResponse(reservation);
            return ResponseEntity.ok(reservationResponse);
        }catch (ResourceNotFoundException ex){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        }
    }
    @GetMapping("/user/{email}/reservation")
    public ResponseEntity<List<ReservationResponse>> getReservationByUserEmail(@PathVariable String email) {
        List<Reservation> reservations = reservationService.getReservationByUserEmail(email);
        List<ReservationResponse> reservationResponses = new ArrayList<>();
        for (Reservation reservation : reservations) {
            ReservationResponse reservationResponse = getReservationResponse(reservation);
            reservationResponses.add(reservationResponse);
        }
        return ResponseEntity.ok(reservationResponses);
    }
    @DeleteMapping("/reservation/{reservationId}/delete")
    public void cancelReservation(@PathVariable Long reservationId){
        reservationService.cancelReservation(reservationId);
    }










    private ReservationResponse getReservationResponse(Reservation reservation) {
        Salle salle = salleService.getSalleById(reservation.getSalle().getId()).get();
        SalleResponse salleResponse = new SalleResponse(
                salle.getId(),
                salle.getSalletype(),
                salle.getSalleprice());

        return new ReservationResponse(
                reservation.getReservationid(), reservation.getCheckIndate(),
                reservation.getCheckOutdate(),reservation.getClientName(),
                reservation.getClientEmail(),
                reservation.getNumberOfSeats(),
                reservation.getReservationConfirmationCode(),
                salleResponse);
    }





}



