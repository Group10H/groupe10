package com.emsi.salle_reservation.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.apache.tomcat.util.codec.binary.Base64;

import java.util.List;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class SalleResponse {
    private Long id;
    private String salletype;
    private Double salleprice;
    private boolean isreserved=false;
    private String image;
    private List<ReservationResponse> reservations;

    public SalleResponse(Long id, String salletype, Double salleprice) {
        this.id = id;
        this.salletype = salletype;
        this.salleprice = salleprice;
    }
    public SalleResponse(Long id ,String salletype, Double salleprice,byte[] imagebytes) {
        this.salletype = salletype;
        this.id = id;
        this.salleprice = salleprice;
        this.image = imagebytes != null ? Base64.encodeBase64String(imagebytes) : null;
    }

    public SalleResponse(Long id,String salletype, Double salleprice, boolean isreserved,byte[] imagebytes,List<ReservationResponse> reservations) {
        this.salletype = salletype;
        this.id = id;
        this.salleprice = salleprice;
        this.image = imagebytes != null ? Base64.encodeBase64String(imagebytes) : null;
        this.isreserved = isreserved;
        this.reservations = reservations;
    }


}
