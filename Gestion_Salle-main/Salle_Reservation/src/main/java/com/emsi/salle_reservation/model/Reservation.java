package com.emsi.salle_reservation.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reservationid;
    @Column(name= "check_In")
    private LocalDate checkIndate;
    @Column(name = "check_out")
    private LocalDate checkOutdate;
    @Column(name = "client_name")
    private String clientName;
    @Column(name = "client_Email")
    private String clientEmail;
    @Column(name = "seats")
    private int numberOfSeats;
    @Column(name = "reservation_Code")
    private String reservationConfirmationCode;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "salle_id")
    private Salle salle;

}
