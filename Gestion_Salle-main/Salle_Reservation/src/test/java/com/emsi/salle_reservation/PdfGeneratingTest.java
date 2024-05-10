package com.emsi.salle_reservation;

import com.emsi.salle_reservation.service.ReservationService;
import com.itextpdf.io.exceptions.IOException;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Paragraph;
import org.junit.jupiter.api.Test;

import java.io.File;
import java.io.FileNotFoundException;

import static org.junit.jupiter.api.Assertions.assertTrue;

public class PdfGeneratingTest {

    @Test
    public void testPDFGeneration() {
        // Define PDF file path
        String pdfFilePath = "C:/Users/User/Desktop/PDFtest/test_document.pdf";

        // Generate PDF
        generatePDF(pdfFilePath);

        // Check if PDF file is created
        File pdfFile = new File(pdfFilePath);
        assertTrue(pdfFile.exists());
    }

    private void generatePDF(String filePath) {
        try {
            // Create a PdfWriter
            PdfWriter writer = new PdfWriter(filePath);

            // Create a PdfDocument
            PdfDocument pdf = new PdfDocument(writer);

            // Create a Document
            Document document = new Document(pdf);

            // Add content to the document
            document.add(new Paragraph("Hello, this is a test PDF document!"));

            // Close the document
            document.close();
        } catch (IOException | FileNotFoundException e) {
            e.printStackTrace();
        }
    }


}
