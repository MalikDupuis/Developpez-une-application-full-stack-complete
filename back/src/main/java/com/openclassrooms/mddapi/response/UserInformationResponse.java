package com.openclassrooms.mddapi.response;

import lombok.Data;

@Data
public class UserInformationResponse {
    private long userId;
    private String nom;
    private String email;

    public UserInformationResponse(long userId, String nom, String email) {
        this.userId = userId;
        this.nom = nom;
        this.email = email;
    }
}
