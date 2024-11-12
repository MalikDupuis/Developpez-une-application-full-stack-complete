package com.openclassrooms.mddapi.requests;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterRequest {

    private String email;


    private String password;


    private String nom;
}
