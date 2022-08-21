package com.mahmutcopoglu.bankingsystemproject.controller;

import com.mahmutcopoglu.bankingsystemproject.dto.CreateBankDto;
import com.mahmutcopoglu.bankingsystemproject.models.Bank;
import com.mahmutcopoglu.bankingsystemproject.result.BankCreateResponse;
import com.mahmutcopoglu.bankingsystemproject.service.BankService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Objects;

@RestController
public class BankController {

    @Autowired
    private BankService bankService;

    @PostMapping("/bank")
    public ResponseEntity<?> saveUser(@RequestBody CreateBankDto createBankDto){
        BankCreateResponse bankCreateResponse = new BankCreateResponse();
        if(this.bankService.isBankNameExist(createBankDto.getName())){
            bankCreateResponse.setSuccess(false);
            bankCreateResponse.setMessage("Given name Already Used :" + createBankDto.getName());
            return new ResponseEntity<>(bankCreateResponse, HttpStatus.CONFLICT);
        }
        Bank bank = this.bankService.save(createBankDto.getName());
        if(Objects.nonNull(bank.getId())){
            bankCreateResponse.setSuccess(true);
            bankCreateResponse.setMessage("Created Successfully");
            bankCreateResponse.setBank(bank);
        }else{
            bankCreateResponse.setSuccess(false);
            bankCreateResponse.setMessage("Failed to create record");
        }
        return ResponseEntity.ok().body(bankCreateResponse);
    }

    @GetMapping("/banks")
    public ResponseEntity<?> getAllBanks(){
        List<Bank> banks = this.bankService.getAllBanks();
        return ResponseEntity.ok().body(banks);
    }
}
