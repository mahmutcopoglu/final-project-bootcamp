package com.mahmutcopoglu.bankingsystemproject.result;

import lombok.Data;

@Data
public class InvalidAccountTypeResponse {
    private boolean success;
    private String message;
}
