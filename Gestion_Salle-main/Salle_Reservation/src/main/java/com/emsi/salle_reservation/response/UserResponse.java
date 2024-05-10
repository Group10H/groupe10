package com.emsi.salle_reservation.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserResponse
{
    private String firstName;
    private String lastName;
    private String email;
    private String password;
}
