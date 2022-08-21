package com.mahmutcopoglu.bankingsystemproject.result;

import com.mahmutcopoglu.bankingsystemproject.models.Bank;
import lombok.Data;

@Data
public class BankCreateResponse {

    private boolean success;
    private String message;
    private Bank bank;
}
