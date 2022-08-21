package com.mahmutcopoglu.bankingsystemproject.service.impl;

import com.mahmutcopoglu.bankingsystemproject.models.User;
import com.mahmutcopoglu.bankingsystemproject.repository.UserRepository;
import com.mahmutcopoglu.bankingsystemproject.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class UserServiceImpl implements UserService {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserRepository userRepository;

    @Override
    public User save(String username, String email, String password) {
        User user = new User();
        user.setUsername(username);
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));
        user.setEnabled(false);
        user.setAuthorities("CREATE_ACCOUNT");
        int recordNumber = this.userRepository.saveUser(user);
        if(recordNumber==1){
            User dbUser = this.userRepository.findById(user.getId());
            return dbUser;
        }else{
            return user;
        }
    }

    @Override
    public boolean isUserExist(String username, String email){
        int recordNumber = this.userRepository.isUserExist(username,email);
        return recordNumber!=0;
    }

    @Override
    public boolean updateEnabled(boolean enabled, int id) {
        int convertBoolean = enabled ? 1 : 0;
        int recordNumber = this.userRepository.updateEnabled(convertBoolean,id);
        return recordNumber == 1;
    }

    @Override
    public User findById(int id) {
        User user = this.userRepository.findById(id);
        return user;
    }

    @Override
    public List<User> getAllUsers() {
        List<User> users = this.userRepository.getAllUsers();
        return users;
    }
}
