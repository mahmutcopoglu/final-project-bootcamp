package com.mahmutcopoglu.bankingsystemproject.service.impl;

import com.mahmutcopoglu.bankingsystemproject.enums.AccountType;
import com.mahmutcopoglu.bankingsystemproject.models.Account;
import com.mahmutcopoglu.bankingsystemproject.models.Bank;
import com.mahmutcopoglu.bankingsystemproject.models.User;
import com.mahmutcopoglu.bankingsystemproject.repository.AccountRepository;
import com.mahmutcopoglu.bankingsystemproject.repository.BankRepository;
import com.mahmutcopoglu.bankingsystemproject.repository.UserRepository;
import com.mahmutcopoglu.bankingsystemproject.security.UserDatabase;
import com.mahmutcopoglu.bankingsystemproject.service.AccountService;
import com.mahmutcopoglu.bankingsystemproject.service.ExchangeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

@Component
public class AccountServiceImpl implements AccountService {

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BankRepository bankRepository;

    @Autowired
    private ExchangeService exchangeService;

    @Override
    public Account save(int bankId, AccountType type) {
        UserDatabase dbUser = (UserDatabase) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = this.userRepository.findById(dbUser.getId());
        Bank bank = this.bankRepository.findById(bankId);
        long accountNumber = (long) Math.floor(Math.random() * 9_000_000_000L) + 1_000_000_000L;
        Account account = new Account();
        account.setNumber(accountNumber);
        account.setType(type);
        account.setBalance(0);
        account.setBank(bank);
        account.setUser(user);
        account.setCreation_date(new Date());
        account.setLast_update_date(new Date());
        account.setDeleted(false);
        int recordNumber = this.accountRepository.saveAccount(account);
        if(recordNumber==1){
            Account accountDb = this.accountRepository.getAccount(account.getId());
            return accountDb;
        }else{
            return account;
        }
    }

    @Override
    public Account findById(int id){
        Account account = this.accountRepository.getAccount(id);
        return account;
    }

    @Override
    public boolean remove(int id) {
        int recordNumber = this.accountRepository.removeAccount(id);
        if(recordNumber==1){
            return true;
        }else{
            return false;
        }
    }

    @Override
    public Account addAmount(int id, double amount) {
        Account account = this.accountRepository.findById(id);
        var newBalance = account.getBalance() + amount;
        var date = new Date();
        int recordNumber = this.accountRepository.updateBalance(id,newBalance,date);
        if(recordNumber==1){
            Account accountDb = this.accountRepository.findById(account.getId());
            return accountDb;
        }else{
            return account;
        }
    }

    @Transactional
    @Override
    public boolean transfer(double amount, int senderAccountId, int receiverAccountId) {
        Account senderAccount = this.accountRepository.getAccount(senderAccountId);
        Account receiverAccount = this.accountRepository.getAccount(receiverAccountId);
        double transferAmount = amount;
        var date = new Date();
        if(senderAccount.getBalance()< amount && amount<=0){
            return false;
        }

        if(!senderAccount.getType().equals(receiverAccount.getType())){
            transferAmount = this.exchangeService.exchange(amount,senderAccount.getType(),receiverAccount.getType());
        }

        if(!senderAccount.getBank().equals(receiverAccount.getBank())){
            if(senderAccount.getType().equals(AccountType.TRY)){
                amount = amount + 3;
            }
            if(senderAccount.getType().equals(AccountType.USD)){
                amount = amount + 1;
            }
        }
        this.accountRepository.transferMoney(senderAccount.getBalance()- amount,senderAccountId, date);
        this.accountRepository.transferMoney(receiverAccount.getBalance() + transferAmount, receiverAccountId, date);
        return true;
    }

    @Override
    public boolean typeControl(AccountType type) {
        var upperCasetype = type.toString().toUpperCase();
        if(upperCasetype == "TRY" || upperCasetype == "USD" || upperCasetype == "ALTIN"){
            return true;
        }else{
            return false;
        }

    }

    @Override
    public List<Account> getLoginUserAccounts() {
        UserDatabase dbUser = (UserDatabase) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        List<Account> accounts = this.accountRepository.findByUserId(dbUser.getId());
        return accounts;
    }

    @Override
    public List<Account> getUserAccounts(int id) {
        List<Account> accounts = this.accountRepository.findByUserId(id);
        return accounts;
    }

    @Override
    public List<Account> getAllAccounts() {
        List<Account> accounts = this.accountRepository.getAllAccounts();
        return accounts;
    }

    @Override
    public boolean hasAuth(int id) {
        Account account = this.accountRepository.getAccount(id);
        int userId = account.getUser().getId();
        UserDatabase dbUser = (UserDatabase) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if(dbUser.getId() != userId) {
            return false;
        }
        return true;
    }
}
