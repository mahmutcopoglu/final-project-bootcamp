package com.mahmutcopoglu.bankingsystemproject.service;

import com.mahmutcopoglu.bankingsystemproject.enums.AccountType;

public interface ExchangeService {

    public double exchange(double amount, AccountType base, AccountType to);

}
