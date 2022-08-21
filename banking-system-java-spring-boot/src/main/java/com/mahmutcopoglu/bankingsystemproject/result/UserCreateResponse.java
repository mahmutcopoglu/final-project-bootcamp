package com.mahmutcopoglu.bankingsystemproject.result;

import com.mahmutcopoglu.bankingsystemproject.models.User;
import lombok.Data;

@Data
public class UserCreateResponse {
    private boolean success;
    private String message;
    private User user;
}
