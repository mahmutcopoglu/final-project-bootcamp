package com.mahmutcopoglu.bankingsystemproject.result;

import lombok.Data;

@Data
public class LoginUserResponse {
    private boolean success;
    private String message;
    private String token;
}
