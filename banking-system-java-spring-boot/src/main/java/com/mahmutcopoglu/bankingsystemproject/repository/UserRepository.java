package com.mahmutcopoglu.bankingsystemproject.repository;


import com.mahmutcopoglu.bankingsystemproject.models.User;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface UserRepository {

    User findByUsername(String username);

    int saveUser(User user);

    User findById(int id);

    int updateEnabled(int enabled, int id);

    int isUserExist(String username, String email);

    List<User> getAllUsers();


}
