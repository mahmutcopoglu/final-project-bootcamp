package com.mahmutcopoglu.bankingsystemproject.dto;

import lombok.Data;

@Data
public class MoneyTransferDto {

    private double amount;
    private int receiverAccountId;

}
