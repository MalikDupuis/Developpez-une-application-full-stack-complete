package com.openclassrooms.mddapi.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JwtResponse {
  private String token;
  private Long id;
  private String nom;
  private String email;

  public JwtResponse(String accessToken, Long id, String nom, String email) {
    this.token = accessToken;
    this.id = id;
    this.nom = nom;
    this.email = email;
  }
}
