package com.emsi.salle_reservation.repository;

import com.emsi.salle_reservation.model.Salle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;

public interface SalleRepository extends JpaRepository<Salle,Long> {
    @Query("SELECT DISTINCT s.salletype From Salle s ")
    List<String> findDistinctSalleTypes();
    @Query(" SELECT s FROM Salle s " +
            " WHERE s.salletype LIKE %:salleType% " +
            " AND s.id NOT IN (" +
            "  SELECT r.salle.id FROM Reservation r " +
            "  WHERE ((r.checkIndate <= :checkOutDate) AND (r.checkOutdate >= :checkInDate))" +
            ")")
    List<Salle> findAvailableSallesByDatesAndType(LocalDate checkInDate, LocalDate checkOutDate, String salleType);
}
