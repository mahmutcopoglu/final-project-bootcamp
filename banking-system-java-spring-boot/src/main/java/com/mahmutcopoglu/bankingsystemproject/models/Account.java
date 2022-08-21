package com.mahmutcopoglu.bankingsystemproject.models;

import com.mahmutcopoglu.bankingsystemproject.enums.AccountType;
import lombok.Data;
import org.apache.ibatis.type.Alias;

import java.util.Date;

@Alias("Account")
@Data
public class Account {

    private int id;
    private long number;
    private double balance;
    private AccountType type;
    private Date creation_date;
    private Date last_update_date;
    private boolean deleted;
    private User user;
    private Bank bank;

}
