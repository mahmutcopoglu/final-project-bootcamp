package com.mahmutcopoglu.bankingsystemproject.service.impl;

import com.mahmutcopoglu.bankingsystemproject.models.Bank;
import com.mahmutcopoglu.bankingsystemproject.repository.BankRepository;
import com.mahmutcopoglu.bankingsystemproject.service.BankService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class BankServiceImpl implements BankService {

    @Autowired
    private BankRepository bankRepository;

    @Override
    public Bank save(String name) {
        Bank bank = new Bank();
        bank.setName(name);
        int recordNumber = this.bankRepository.saveBank(bank);
        if(recordNumber==1){
            Bank dbBank = this.bankRepository.findById(bank.getId());
            return dbBank;
        }else{
            return bank;
        }
    }

    @Override
    public boolean isBankNameExist(String name) {
        int recordNumber = this.bankRepository.isBankNameExist(name);
        return recordNumber!=0;
    }

    @Override
    public List<Bank> getAllBanks() {
        List<Bank> banks = this.bankRepository.getAllBanks();
        return banks;
    }
}
