package com.mahmutcopoglu.bankingsystemproject.models;

import lombok.Data;
import org.apache.ibatis.type.Alias;

import java.util.List;

@Alias("User")
@Data
public class User {

    private int id;
    private String username;
    private String email;
    private String password;
    private boolean enabled;
    private String authorities;

}
