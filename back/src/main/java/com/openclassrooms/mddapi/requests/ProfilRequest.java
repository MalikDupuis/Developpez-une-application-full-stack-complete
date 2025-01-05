package com.openclassrooms.mddapi.requests;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProfilRequest {

    private String email;
    private String nom;
    private long userId;
}
