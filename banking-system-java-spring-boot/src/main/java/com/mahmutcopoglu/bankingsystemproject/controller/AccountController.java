package com.mahmutcopoglu.bankingsystemproject.controller;

import com.mahmutcopoglu.bankingsystemproject.dto.AccountDepositDto;
import com.mahmutcopoglu.bankingsystemproject.dto.CreateAccountDto;
import com.mahmutcopoglu.bankingsystemproject.dto.MoneyTransferDto;
import com.mahmutcopoglu.bankingsystemproject.models.Account;
import com.mahmutcopoglu.bankingsystemproject.result.*;
import com.mahmutcopoglu.bankingsystemproject.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class AccountController {

    @Autowired
    private AccountService accountService;

    @Autowired
    private KafkaTemplate<String,String> producer;



    @PostMapping("/account")
    public ResponseEntity<?> saveAccount(@RequestBody CreateAccountDto createAccountDto){
        if(this.accountService.typeControl(createAccountDto.getType())){
            Account account = this.accountService.save(createAccountDto.getBank_id(),createAccountDto.getType());
            CreateAccountResponse createAccountResponse = new CreateAccountResponse();
            createAccountResponse.setSuccess(true);
            createAccountResponse.setMessage("Account Created");
            createAccountResponse.setAccount(account);
            return ResponseEntity.ok().body(createAccountResponse);
        }else{
            InvalidAccountTypeResponse invalidAccountTypeResponse = new InvalidAccountTypeResponse();
            invalidAccountTypeResponse.setSuccess(false);
            invalidAccountTypeResponse.setMessage("Invalid Account Type :" + createAccountDto.getType());
            return ResponseEntity.ok().body(invalidAccountTypeResponse);
        }

    }

    @GetMapping(path = "/account/{id}")
    public ResponseEntity<?> detailAccount(@PathVariable(name="id") int id){
        if(this.accountService.hasAuth(id)){
            Account account = this.accountService.findById(id);
            AccountDetailResponse accountDetailResponse = new AccountDetailResponse();
            accountDetailResponse.setAccount(account);
            return ResponseEntity.ok().lastModified(account.getLast_update_date().getTime()).body(accountDetailResponse);
        }else{
            ForbiddenDetailResponse forbiddenDetailResponse = new ForbiddenDetailResponse();
            forbiddenDetailResponse.setMessage("Access Denied");
            return ResponseEntity.ok().body(forbiddenDetailResponse);
        }

    }

    @DeleteMapping(path = "/account/{id}")
    private ResponseEntity<?> removeAccount(@PathVariable(name = "id") int id){
        boolean deleteRecord = this.accountService.remove(id);
        RemovedAccountResponse removedAccountResponse = new RemovedAccountResponse();
        if(deleteRecord)
        {
            removedAccountResponse.setSuccess(true);
            removedAccountResponse.setMessage("Account Deleted");
            return ResponseEntity.ok().body(removedAccountResponse);
        }else {
            removedAccountResponse.setSuccess(false);
            removedAccountResponse.setMessage("Account Deletion Failed");
            return ResponseEntity.ok().body(removedAccountResponse);
        }
    }

    @PatchMapping(path = "/account/{id}")
    private ResponseEntity<?> depositAccount(@PathVariable(name = "id") int id,
                                             @RequestBody AccountDepositDto accountDepositDto){
        if(this.accountService.hasAuth(id)){
            Account account = this.accountService.addAmount(id,accountDepositDto.getAmount());
            String message = account.getNumber() + " deposit amount:" + accountDepositDto.getAmount() + " " + account.getType();
            producer.send("log",message);
            AccountDepositResponse accountDepositResponse = new AccountDepositResponse();
            accountDepositResponse.setSuccess(true);
            accountDepositResponse.setMessage("Deposit Successfully");
            accountDepositResponse.setBalance(account.getBalance());
            return ResponseEntity.ok().body(accountDepositResponse);
        }else{
            ForbiddenDetailResponse forbiddenDetailResponse = new ForbiddenDetailResponse();
            forbiddenDetailResponse.setMessage("Access Denied");
            return ResponseEntity.ok().body(forbiddenDetailResponse);
        }

    }

    @PostMapping("/account/{senderAccountId}")
    private ResponseEntity<?> moneyTransfer(@PathVariable(name = "senderAccountId") int id,
                                            @RequestBody MoneyTransferDto moneyTransferDto){
        MoneyTransferResponse moneyTransferResponse = new MoneyTransferResponse();
        if(this.accountService.hasAuth(id)){
            Account senderAccount = this.accountService.findById(id);
            Account receiverAccount = this.accountService.findById(moneyTransferDto.getReceiverAccountId());
            boolean result = this.accountService.transfer(moneyTransferDto.getAmount(), id, moneyTransferDto.getReceiverAccountId());
            if(result){
                if(!senderAccount.getBank().equals(receiverAccount.getBank())){
                    moneyTransferResponse.setSuccess(true);
                    moneyTransferResponse.setMessage("EFT Successfull");
                }
                else{
                    moneyTransferResponse.setSuccess(true);
                    moneyTransferResponse.setMessage("Transfer Successfull");
                }
                String message = senderAccount.getNumber() + " transfer amount:" + moneyTransferDto.getAmount()+ " " + senderAccount.getType() + ",transferred_account:" + receiverAccount.getNumber();
                producer.send("log",message);
                return ResponseEntity.ok().body(moneyTransferResponse);
            }else{
                moneyTransferResponse.setMessage("Insufficient Balance");
                return ResponseEntity.ok().body(moneyTransferResponse);
            }
        }else{
            ForbiddenDetailResponse forbiddenDetailResponse = new ForbiddenDetailResponse();
            forbiddenDetailResponse.setMessage("Access Denied");
            return ResponseEntity.ok().body(forbiddenDetailResponse);
        }
    }

    @GetMapping("/accounts/user")
    private ResponseEntity<?> getUserAccounts(){
        List<Account> accounts = this.accountService.getLoginUserAccounts();
        AccountsResponse userAccountsResponse = new AccountsResponse();
        userAccountsResponse.setSuccess(true);
        userAccountsResponse.setData(accounts);
        return ResponseEntity.ok().body(userAccountsResponse);
    }

    @GetMapping("/accounts/user/{id}")
    private ResponseEntity<?> getUserAccountsByUserId(@PathVariable int id){
        List<Account> accounts = this.accountService.getUserAccounts(id);
        AccountsResponse userAccountsResponse = new AccountsResponse();
        userAccountsResponse.setSuccess(true);
        userAccountsResponse.setData(accounts);
        return ResponseEntity.ok().body(userAccountsResponse);
    }

    @GetMapping("/accounts")
    private ResponseEntity<?> getAllAccounts(){
        List<Account> accounts = this.accountService.getAllAccounts();
        AccountsResponse accountsResponse = new AccountsResponse();
        accountsResponse.setSuccess(true);
        accountsResponse.setData(accounts);
        return ResponseEntity.ok().body(accountsResponse);
    }





}
