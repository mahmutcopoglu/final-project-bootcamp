package com.mahmutcopoglu.bankingsystemproject.service;

import com.mahmutcopoglu.bankingsystemproject.models.Bank;

import java.util.List;

public interface BankService {
    Bank save(String name);

    boolean isBankNameExist(String name);

    List<Bank> getAllBanks();
}
