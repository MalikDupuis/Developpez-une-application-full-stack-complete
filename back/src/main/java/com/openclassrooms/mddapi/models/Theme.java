package com.openclassrooms.mddapi.models;

import lombok.Data;

@Data
public class Theme {
    private long id;
    private String title;
    private String description;

    public Theme(int id, String title, String description) {
        this.id = id;
        this.title = title;
        this.description = description;
    }




}
