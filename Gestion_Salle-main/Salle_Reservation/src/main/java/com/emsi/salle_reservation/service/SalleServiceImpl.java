package com.emsi.salle_reservation.service;

import com.emsi.salle_reservation.exception.InternalServerException;
import com.emsi.salle_reservation.exception.ResourceNotFoundException;
import com.emsi.salle_reservation.model.Salle;
import com.emsi.salle_reservation.repository.SalleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.context.config.ConfigDataResourceNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.sql.rowset.serial.SerialBlob;
import java.io.IOException;
import java.sql.Blob;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SalleServiceImpl implements SalleService{
    private final SalleRepository salleRepository;
    @Override
    public Salle addNewSalle(MultipartFile file, String salletype, Double salleprice) throws SQLException, IOException {
        Salle salle = new Salle();
        salle.setSalletype(salletype);
        salle.setSalleprice(salleprice);
        if(!file.isEmpty()) {
            byte[] photoBytes = file.getBytes();
            Blob imageBlob = new SerialBlob(photoBytes);
            salle.setImage(imageBlob);
        }
        return salleRepository.save(salle);
    }

    @Override
    public List<String> getAllSalleTypes() {
        return salleRepository.findDistinctSalleTypes();
    }

    @Override
    public List<Salle> getAllSalles() {
        return salleRepository.findAll();
    }

    @Override
    public byte[] getSalleImageBySalleId(Long salleId) throws SQLException {
        Optional<Salle> salle = salleRepository.findById(salleId);
        if(salle.isEmpty()){
            throw new ResourceNotFoundException("Salle n'existe pas");
        }
        Blob imageBlob = salle.get().getImage();
        if(imageBlob != null){
            return imageBlob.getBytes(1, (int) imageBlob.length());
        }
        return null;
    }

    @Override
    public void deleteSalle(Long salleId) {
        Optional<Salle> salle = salleRepository.findById(salleId);
        if(salle.isPresent()){
            salleRepository.deleteById(salleId);
        }
    }

    @Override
    public Salle updateSalle(Long salleId, String salleType,Double sallePrice, byte[] imageBytes) {
        Salle salle = salleRepository.findById(salleId).orElseThrow(()-> new ResourceNotFoundException("Salle n'existe pas"));
        if (salleType!=null) salle.setSalletype(salleType);
        if(sallePrice!=null) salle.setSalleprice(sallePrice);
        if(imageBytes !=null && imageBytes.length>0){
            try{
                salle.setImage(new SerialBlob(imageBytes));
            }catch (SQLException e){
                throw new InternalServerException("Erreur modification salle ");
            }
        }
        return salleRepository.save(salle);
    }

    @Override
    public Optional<Salle> getSalleById(Long salleId) {
        return Optional.of(salleRepository.findById(salleId).get());
    }

    @Override
    public List<Salle> getAvailableSalles(LocalDate checkInDate, LocalDate checkOutDate, String salleType) {
        return salleRepository.findAvailableSallesByDatesAndType(checkInDate, checkOutDate, salleType);
    }
}
