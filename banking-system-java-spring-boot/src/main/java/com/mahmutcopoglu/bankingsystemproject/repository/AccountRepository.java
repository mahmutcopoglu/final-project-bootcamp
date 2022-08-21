package com.mahmutcopoglu.bankingsystemproject.repository;

import com.mahmutcopoglu.bankingsystemproject.models.Account;
import org.apache.ibatis.annotations.Mapper;

import java.util.Date;
import java.util.List;

@Mapper
public interface AccountRepository {

    int saveAccount(Account account);

    int removeAccount(int id);

    Account findById(int id);

    Account getAccount(int id);

    int updateBalance(int id, double balance, Date date);

    void transferMoney(double balance, int accountId, Date date);

    List<Account> findByUserId(int userId);

    List<Account> getAllAccounts();


}
