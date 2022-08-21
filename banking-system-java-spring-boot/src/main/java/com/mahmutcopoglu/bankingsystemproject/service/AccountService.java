package com.mahmutcopoglu.bankingsystemproject.service;

import com.mahmutcopoglu.bankingsystemproject.enums.AccountType;
import com.mahmutcopoglu.bankingsystemproject.models.Account;
import com.mahmutcopoglu.bankingsystemproject.models.User;

import java.util.List;

public interface AccountService {

    Account save(int bankId, AccountType type);

    boolean hasAuth(int id);

    Account findById(int id);

    boolean remove(int id);

    Account addAmount(int id, double amount);

    boolean transfer(double amount, int senderAccountId, int receiverAccountId);

    boolean typeControl(AccountType type);

    List<Account> getLoginUserAccounts();

    List<Account> getUserAccounts(int id);

    List<Account> getAllAccounts();

}
