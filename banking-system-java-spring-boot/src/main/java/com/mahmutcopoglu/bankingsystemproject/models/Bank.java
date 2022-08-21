package com.mahmutcopoglu.bankingsystemproject.models;

import lombok.Data;
import org.apache.ibatis.type.Alias;

@Alias("Bank")
@Data
public class Bank {
    private int id;
    private String name;
}
