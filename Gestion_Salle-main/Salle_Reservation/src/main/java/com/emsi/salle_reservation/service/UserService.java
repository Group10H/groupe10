package com.emsi.salle_reservation.service;

import com.emsi.salle_reservation.model.User;

import javax.management.relation.RoleNotFoundException;
import java.util.List;

public interface UserService {
    List<User> getUsers();
    void deleteUser(String email);
    User getUser(String email);

    void createUser(User user);

    boolean existsByEmail(String email);
}
