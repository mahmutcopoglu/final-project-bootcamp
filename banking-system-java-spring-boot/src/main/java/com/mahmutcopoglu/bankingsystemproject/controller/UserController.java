package com.mahmutcopoglu.bankingsystemproject.controller;

import com.mahmutcopoglu.bankingsystemproject.dto.CreateUserDto;
import com.mahmutcopoglu.bankingsystemproject.dto.UserEnabledStatusDto;
import com.mahmutcopoglu.bankingsystemproject.models.User;
import com.mahmutcopoglu.bankingsystemproject.result.ChangeEnabledResponse;
import com.mahmutcopoglu.bankingsystemproject.result.UserCreateResponse;
import com.mahmutcopoglu.bankingsystemproject.security.UserDatabase;
import com.mahmutcopoglu.bankingsystemproject.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> saveUser(@RequestBody CreateUserDto createUserDto){
        UserCreateResponse userCreateResponse = new UserCreateResponse();
        if(this.userService.isUserExist(createUserDto.getUsername(),createUserDto.getEmail())){
            userCreateResponse.setSuccess(false);
            userCreateResponse.setMessage("Given username or email already Used :" + createUserDto.getUsername());
            return new ResponseEntity<>(userCreateResponse,HttpStatus.CONFLICT);
        }
       User user = this.userService.save(createUserDto.getUsername(), createUserDto.getEmail(), createUserDto.getPassword());
       if(Objects.nonNull(user.getId())){
           userCreateResponse.setSuccess(true);
           userCreateResponse.setMessage("Created Successfully");
           userCreateResponse.setUser(user);
       }else{
           userCreateResponse.setSuccess(false);
           userCreateResponse.setMessage("Failed to create record");
       }
       return ResponseEntity.ok().body(userCreateResponse);
    }

    @PostMapping("/users/{id}")
    public ResponseEntity<?> changeEnabled(@PathVariable int id,
                                           @RequestBody UserEnabledStatusDto userEnabledStatusDto){
        ChangeEnabledResponse changeEnabledResponse = new ChangeEnabledResponse();
        boolean status = this.userService.updateEnabled(userEnabledStatusDto.isEnabled(),id);
        if(status){
            changeEnabledResponse.setStatus("success");
            changeEnabledResponse.setMessage(userEnabledStatusDto.isEnabled() ? "User Enabled":"User Disabled");
        }else{
            changeEnabledResponse.setStatus("error");
            changeEnabledResponse.setMessage("There was no change on the user");
        }
        return ResponseEntity.ok().body(changeEnabledResponse);
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<?> getUserById(@PathVariable int id){
        User user = this.userService.findById(id);
        return ResponseEntity.ok().body(user);
    }


    @GetMapping("/user")
    public ResponseEntity<?> getLoginUser(){
        UserDatabase dbUser = (UserDatabase) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = this.userService.findById(dbUser.getId());
        return ResponseEntity.ok().body(user);
    }

    @GetMapping("/users")
    public ResponseEntity<?> getAllUsers(){
        List<User> users = this.userService.getAllUsers();
        return ResponseEntity.ok().body(users);
    }




}
