package com.mahmutcopoglu.bankingsystemproject.result;

import lombok.Data;

@Data
public class MoneyTransferResponse {
    private boolean success;
    private String message;
}
