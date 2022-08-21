package com.mahmutcopoglu.bankingsystemproject.security;
import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

public class UserDatabase extends User {
    private int id;

    public int getId() {
        return id;
    }


    public void setId(int id) {
        this.id = id;
    }

    public UserDatabase(int id, String username, String password, Collection<? extends GrantedAuthority> authorities, boolean enabled) {
        super(username, password, enabled, true, true, true, authorities);
        this.id = id;
    }
}
