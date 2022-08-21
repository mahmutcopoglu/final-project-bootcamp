package com.mahmutcopoglu.bankingsystemproject.dto;

import com.mahmutcopoglu.bankingsystemproject.enums.AccountType;
import lombok.Data;

@Data
public class CreateAccountDto {

    private int bank_id;
    private AccountType type;

}
