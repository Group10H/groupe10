package com.emsi.salle_reservation;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

import static org.mockito.Mockito.*;

public class EmailSendingTest {
    private final JavaMailSender emailSender;

    public EmailSendingTest() {
        // Mocking the JavaMailSender
        emailSender = mock(JavaMailSender.class);
    }
    @Test
    public void testEmailSending() {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo("mokrim147@gmail.com");
        message.setSubject("Test Email");
        message.setText("This is a test email sent using Spring Boot.");

        emailSender.send(message);
        verify(emailSender, times(1)).send(message);
    }
}
