package com.mahmutcopoglu.bankingsystemproject.service;

import com.mahmutcopoglu.bankingsystemproject.models.User;

import java.util.List;

public interface UserService {
    User save(String username, String email, String password);

    boolean isUserExist(String username, String email);

    boolean updateEnabled(boolean enabled, int id);

    User findById(int id);

    List<User> getAllUsers();
}
