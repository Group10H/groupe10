package com.emsi.salle_reservation.service;

import com.emsi.salle_reservation.model.Salle;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface SalleService {
    Salle addNewSalle(MultipartFile image, String salletype, Double salleprice) throws SQLException, IOException;

    List<String> getAllSalleTypes();

    List<Salle> getAllSalles();

    byte[] getSalleImageBySalleId(Long salleId) throws SQLException;

    void deleteSalle(Long salleId);

    Salle updateSalle(Long salleId, String salleType, Double sallePrice, byte[] imageBytes);

    Optional<Salle> getSalleById(Long salleId);

    List<Salle> getAvailableSalles(LocalDate checkInDate, LocalDate checkOutDate, String salleType);
}