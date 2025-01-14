package com.openclassrooms.mddapi.response;

import lombok.Data;

@Data
public class ThemeResponse {
    private long id;
    private String title;
    private String description;

    public ThemeResponse(long id, String title, String description) {
        this.id = id;
        this.title = title;
        this.description = description;
    }
}
