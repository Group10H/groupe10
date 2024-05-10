package com.emsi.salle_reservation.response;

import com.emsi.salle_reservation.model.Salle;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ReservationResponse {
    private Long reservationid;
    private LocalDate checkIndate;
    private LocalDate checkOutdate;
    private String clientName;
    private String clientEmail;
    private int numberOfSeats;
    private String reservationConfirmationCode;


    private SalleResponse salle;

    public ReservationResponse(Long reservationid, LocalDate checkIndate, LocalDate checkOutdate,String reservationConfirmationCode) {
        this.reservationid = reservationid;
        this.checkIndate = checkIndate;
        this.checkOutdate = checkOutdate;
        this.reservationConfirmationCode=reservationConfirmationCode;
    }
}
