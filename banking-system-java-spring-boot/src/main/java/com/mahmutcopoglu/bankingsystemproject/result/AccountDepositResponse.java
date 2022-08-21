package com.mahmutcopoglu.bankingsystemproject.result;

import lombok.Data;

@Data
public class AccountDepositResponse {

    private boolean success;
    private String message;
    private double balance;

}
