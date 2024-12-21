package com.openclassrooms.mddapi.models;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Subscription {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Enumerated(EnumType.STRING)
    private Theme theme;
    private Long userId;


}
