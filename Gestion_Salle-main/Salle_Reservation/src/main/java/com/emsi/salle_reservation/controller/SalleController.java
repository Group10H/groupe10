package com.emsi.salle_reservation.controller;

import com.emsi.salle_reservation.exception.ImageRetrivalException;
import com.emsi.salle_reservation.exception.ResourceNotFoundException;
import com.emsi.salle_reservation.model.Reservation;
import com.emsi.salle_reservation.model.Salle;
import com.emsi.salle_reservation.response.ReservationResponse;
import com.emsi.salle_reservation.response.SalleResponse;
import com.emsi.salle_reservation.service.ReservationService;
import com.emsi.salle_reservation.service.SalleService;
import lombok.RequiredArgsConstructor;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.sql.rowset.serial.SerialBlob;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.sql.Blob;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@CrossOrigin("*")
@RestController
@RequiredArgsConstructor
@RequestMapping("/salles")
public class SalleController {
    private final SalleService salleService;
    private final ReservationService reservationService;
    @PostMapping("/add/new-salle")
    public ResponseEntity<SalleResponse> addNewSalle(@RequestParam("image") MultipartFile image,@RequestParam("salletype") String salletype,@RequestParam("salleprice") Double salleprice) throws SQLException, IOException {
        Salle salle=salleService.addNewSalle(image,salletype,salleprice);
        SalleResponse response=new SalleResponse(salle.getId(),salle.getSalletype(),salle.getSalleprice());
        return ResponseEntity.ok(response);

    }

    @GetMapping("/salle-types")
    public List<String> getSalleTypes(){
        return salleService.getAllSalleTypes();
    }
    @GetMapping("/all-salles")
    public ResponseEntity<List<SalleResponse>> getAllSalles() throws SQLException {
        List<Salle> salles=salleService.getAllSalles();
        List<SalleResponse> salleResponses=new ArrayList<>();
        for(Salle salle:salles){
            byte[] imageBytes = salleService.getSalleImageBySalleId(salle.getId());
            if(imageBytes!=null && imageBytes.length>0){
                String base64Image= Base64.encodeBase64String(imageBytes);
                SalleResponse salleResponse=getSalleResponse(salle);
                salleResponse.setImage(base64Image);
                salleResponses.add(salleResponse);

            }
        }
        return ResponseEntity.ok(salleResponses);
    }
   @DeleteMapping("/delete/salle/{salleId}")
    public ResponseEntity<Void> deleteSalle(@PathVariable  Long salleId) throws SQLException {
        salleService.deleteSalle(salleId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    @PutMapping("/update/{salleId}")
    public ResponseEntity<SalleResponse> updateSalle(@PathVariable Long salleId,
                                                     @RequestParam(required = false) String  salletype,
                                                     @RequestParam(required = false) Double salleprice,
                                                     @RequestParam(required = false) MultipartFile image) throws SQLException, IOException {
        byte[] imageBytes=image !=null && !image.isEmpty()? image.getBytes() : salleService.getSalleImageBySalleId(salleId);
        Blob imageBlob=imageBytes!=null && imageBytes.length>0? new SerialBlob(imageBytes):null;
        Salle salle=salleService.updateSalle(salleId, salletype, salleprice, imageBytes);
        salle.setImage(imageBlob);
        SalleResponse response=getSalleResponse(salle);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/salle/{salleId}")
    public ResponseEntity<Optional<SalleResponse>> getSalleById(@PathVariable Long salleId) throws SQLException {
        Optional<Salle> salle = salleService.getSalleById(salleId);
        return salle.map(salle1 -> {
            SalleResponse salleResponse=getSalleResponse(salle1);
            return ResponseEntity.ok(Optional.of(salleResponse));
        }).orElseThrow(()->new ResourceNotFoundException("Salle n'existe pas"));
    }
    @GetMapping("/available-salles")
    public ResponseEntity<List<SalleResponse>> getAvailableSalles(
            @RequestParam("checkIndate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkInDate,
            @RequestParam("checkOutdate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)LocalDate checkOutDate,
            @RequestParam("salletype") String salleType) throws SQLException {
        List<Salle> availableSalles = salleService.getAvailableSalles(checkInDate, checkOutDate, salleType);
        List<SalleResponse> salleResponses = new ArrayList<>();
        for (Salle salle : availableSalles){
            byte[] imageBytes = salleService.getSalleImageBySalleId(salle.getId());
            if (imageBytes != null && imageBytes.length > 0){
                String imageBase64 = Base64.encodeBase64String(imageBytes);
                SalleResponse salleResponse = getSalleResponse(salle);
                salleResponse.setImage(imageBase64);
                salleResponses.add(salleResponse);
            }
        }
        if(salleResponses.isEmpty()){
            return ResponseEntity.noContent().build();
        }else{
            return ResponseEntity.ok(salleResponses);
        }
    }

    private SalleResponse getSalleResponse(Salle salle) {
        List<Reservation> reservations=getAllReservationBySalleId(salle.getId());

        List<ReservationResponse> reservationinfo=reservations.stream().map(reservation -> new ReservationResponse(reservation.getReservationid(),reservation.getCheckIndate(),reservation.getCheckOutdate(),reservation.getReservationConfirmationCode())).toList();

        byte[] imageBytes = null;

        Blob imageBlob=salle.getImage();
        if(imageBlob!=null){
            try {
                imageBytes=imageBlob.getBytes(1,(int) imageBlob.length());
            } catch (SQLException e) {
                throw new ImageRetrivalException("Error retrieving image");
            }
        }
        return new SalleResponse(salle.getId(),salle.getSalletype(),salle.getSalleprice(),salle.isIsreserved(),imageBytes,reservationinfo);

    }

    private List<Reservation> getAllReservationBySalleId(Long salleid) {
        return reservationService.getAllReservationBySalleId(salleid);
    }
}
