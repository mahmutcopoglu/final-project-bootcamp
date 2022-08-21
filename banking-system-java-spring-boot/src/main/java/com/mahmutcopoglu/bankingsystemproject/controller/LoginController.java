package com.mahmutcopoglu.bankingsystemproject.controller;

import com.mahmutcopoglu.bankingsystemproject.result.LoginUserResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.mahmutcopoglu.bankingsystemproject.dto.LoginRequest;
import com.mahmutcopoglu.bankingsystemproject.security.JWTTokenUtil;
import com.mahmutcopoglu.bankingsystemproject.service.impl.MyBatisUserDetailsService;


@RestController
public class LoginController {
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JWTTokenUtil jwtTokenUtil;

    @Autowired
    private MyBatisUserDetailsService myBatisUserDetailsService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsername(),loginRequest.getPassword()));
        } catch (BadCredentialsException e) {
            return ResponseEntity.badRequest().body("Bad credentials");
        }catch (DisabledException e) {
        }
        final UserDetails userDetails = myBatisUserDetailsService.loadUserByUsername(loginRequest.getUsername());
        if(userDetails.isEnabled()){
            LoginUserResponse loginUserResponse = new LoginUserResponse();
            loginUserResponse.setSuccess(true);
            loginUserResponse.setMessage("Logged-In Successfully");
            final String token = jwtTokenUtil.generateToken(userDetails);
            loginUserResponse.setToken(token);
            return ResponseEntity.ok().body(loginUserResponse);
        }else{
            return new ResponseEntity<>("User is disabled",HttpStatus.FORBIDDEN);
        }

    }
}