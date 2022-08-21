package com.mahmutcopoglu.bankingsystemproject.result;

import com.mahmutcopoglu.bankingsystemproject.models.Account;
import lombok.Data;

@Data
public class CreateAccountResponse {

    private boolean success;
    private String message;
    private Account account;

}
