package com.mahmutcopoglu.bankingsystemproject.repository;

import com.mahmutcopoglu.bankingsystemproject.models.Bank;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface BankRepository {

    int saveBank(Bank bank);

    Bank findById(int id);

    int isBankNameExist(String name);

    List<Bank> getAllBanks();
}
