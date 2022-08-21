package com.mahmutcopoglu.bankingsystemproject.dto.exchange;

import java.util.List;

@lombok.Data
public class Result {
    private String base;
    private String lastupdate;
    private List<Data> data;
}
