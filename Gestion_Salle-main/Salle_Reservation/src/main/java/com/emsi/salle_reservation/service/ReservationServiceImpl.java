package com.emsi.salle_reservation.service;

import com.emsi.salle_reservation.exception.InvalidReservationRequestException;
import com.emsi.salle_reservation.exception.ResourceNotFoundException;
import com.emsi.salle_reservation.model.Reservation;
import com.emsi.salle_reservation.model.Salle;
import com.emsi.salle_reservation.repository.ReservationRepository;
import com.itextpdf.io.image.ImageDataFactory;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Image;
import com.itextpdf.layout.element.Paragraph;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.net.MalformedURLException;
import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReservationServiceImpl implements ReservationService {
    private final ReservationRepository reservationRepository;
    private final SalleService salleService;
    @Autowired
    private JavaMailSender emailSender;

    @Override
    public List<Reservation> getAllReservationBySalleId(Long salleid) {
        return reservationRepository.findBySalleId(salleid);
    }

    @Override
    public List<Reservation> getAllReservations() {
        return reservationRepository.findAll();
    }

    @Override
    public String saveReservation(Long salleId, Reservation reservationRequest) {
        if (reservationRequest.getCheckOutdate().isBefore(reservationRequest.getCheckIndate())){
            throw new InvalidReservationRequestException("La date d'arrivée doit etre avant la date de départ");
        }
        Salle salle = salleService.getSalleById(salleId).get();
        List<Reservation> existingReservations = salle.getReservations();
        boolean salleIsAvailable = salleIsAvailable(reservationRequest,existingReservations);
        if (salleIsAvailable){
            salle.addReservation(reservationRequest);
            sendConfirmationEmail(reservationRequest.getClientEmail(),reservationRequest.getClientName(), reservationRequest.getReservationConfirmationCode(),salle.getSalletype(),reservationRequest.getCheckIndate(),reservationRequest.getCheckOutdate(),salle.getSalleprice(),reservationRequest.getNumberOfSeats());
            reservationRepository.save(reservationRequest);
        }else{
            throw  new InvalidReservationRequestException(" La salle n'est pas disponible pour cette dates;");
        }
        // ------Generate PDF
        try {
            File pdfFile = generateReservationPDF(reservationRequest,salle.getSalletype(), salle.getSalleprice());

        } catch (Exception e) {
            // Handle PDF generation errors
            e.printStackTrace();
            throw new RuntimeException("Erreur lors de la génération du PDF");
        }



        return reservationRequest.getReservationConfirmationCode();

    }

    @Override
    public Reservation findByReservationConfirmationCode(String confirmationCode) {
        return reservationRepository.findByReservationConfirmationCode(confirmationCode).orElseThrow(()-> new ResourceNotFoundException("aucun reservation par le code  "+confirmationCode));
    }

    @Override
    public List<Reservation> getReservationByUserEmail(String email) {
        return reservationRepository.findByClientEmail(email);
    }

    @Override
    public void cancelReservation(Long reservationId) {
        reservationRepository.deleteById(reservationId);
    }


    private boolean salleIsAvailable(Reservation reservationRequest, List<Reservation> existingReservations) {
        return existingReservations.stream().noneMatch(existingReservation -> reservationRequest.getCheckIndate().equals(existingReservation.getCheckIndate())
                || reservationRequest.getCheckOutdate().isBefore(existingReservation.getCheckOutdate())

                || (reservationRequest.getCheckIndate().isAfter(existingReservation.getCheckIndate())
                && reservationRequest.getCheckIndate().isBefore(existingReservation.getCheckOutdate()))

                || (reservationRequest.getCheckIndate().isBefore(existingReservation.getCheckIndate())
                && reservationRequest.getCheckOutdate().equals(existingReservation.getCheckOutdate()))

                || (reservationRequest.getCheckIndate().isBefore(existingReservation.getCheckIndate())
                && reservationRequest.getCheckOutdate().isAfter(existingReservation.getCheckOutdate()))

                || (reservationRequest.getCheckIndate().equals(existingReservation.getCheckOutdate())
                && reservationRequest.getCheckOutdate().equals(existingReservation.getCheckIndate()))

                || (reservationRequest.getCheckIndate().equals(existingReservation.getCheckOutdate())
                && reservationRequest.getCheckOutdate().equals(reservationRequest.getCheckIndate()))





        );
    }
/*-------mail*/
    private void sendConfirmationEmail(String recipientEmail, String clientName, String confirmationCode, String roomType, LocalDate checkInDate, LocalDate checkOutDate, Double price,int seats) {
        String subject = "Confirmation de réservation";
        String body = "Bonjour " + clientName + ",\n\n"
                + "Votre réservation a été confirmée avec succès.\n\n"
                + "Détails de la réservation :\n"
                + "Type de Salle : " + roomType + "\n"
                +"Nombre de place reserver:"+seats + "\n"
                + "Date d'arrivée : " + checkInDate.toString() + "\n"
                + "Date de départ : " + checkOutDate.toString() + "\n"
                + "Prix : " + price + " DH\n"
                + "Code de confirmation : " + confirmationCode + "\n\n"
                + "Nous vous remercions de votre réservation.\n\n"
                + "Cordialement,\n"
                + "Votre équipe de réservation";

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(recipientEmail);
        message.setSubject(subject);
        message.setText(body);

        emailSender.send(message);
    }
/*--------pdf---------*/
private File generateReservationPDF(Reservation reservation, String salleType, Double sallePrice) throws MalformedURLException {
    String pdfFilePath = "C:/Users/User/Desktop/PDFtest/" + reservation.getClientName() + ".pdf";
    File pdfFile = null;
    Image logo = new Image(ImageDataFactory.create("C:/Users/User/Desktop/PDFtest/EmsiLogo.JPG"));



    try (PdfWriter writer = new PdfWriter(pdfFilePath);
         PdfDocument pdf = new PdfDocument(writer);
         Document document = new Document(pdf)) {
        document.add(logo);
        document.add(new Paragraph("Confirmation de réservation"));
        document.add(new Paragraph("Client: " + reservation.getClientName()));
        document.add(new Paragraph("Email: " + reservation.getClientEmail()));
        document.add(new Paragraph("Type de salle: " + salleType));
        document.add(new Paragraph("Date d'arrivée: " + reservation.getCheckIndate()));
        document.add(new Paragraph("Date de départ: " + reservation.getCheckOutdate()));
        document.add(new Paragraph("Prix: " + sallePrice));

        pdfFile = new File(pdfFilePath);
    } catch (Exception e) {
        // Handle PDF generation errors
        e.printStackTrace();
        throw new RuntimeException("Erreur lors de la génération du PDF");
    }

    return pdfFile;
}





}
