package com.emsi.salle_reservation.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.apache.commons.lang3.RandomStringUtils;

import java.sql.Blob;
import java.util.ArrayList;
import java.util.List;
@Entity
@Getter
@Setter
@AllArgsConstructor
public class Salle {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String salletype;
    private Double salleprice;
    private boolean isreserved=false;
    @Lob
    private Blob image;
    @OneToMany(mappedBy ="salle",fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    private List<Reservation> reservations;

    //avoid no pointer exception
    public Salle() {
        this.reservations = new ArrayList<>();
    }
    public void addReservation(Reservation reservation) {
        if(reservations==null){
            reservations = new ArrayList<>();
        }
        reservations.add(reservation);
        reservation.setSalle(this);
        isreserved=true;
        String reservationCode=RandomStringUtils.randomNumeric(10);
        reservation.setReservationConfirmationCode(reservationCode);
    }
}
