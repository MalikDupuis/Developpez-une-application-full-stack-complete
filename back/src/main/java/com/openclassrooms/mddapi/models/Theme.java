package com.openclassrooms.mddapi.models;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.openclassrooms.mddapi.deserializers.ThemeDeserializer;

@JsonDeserialize(using = ThemeDeserializer.class)
public enum Theme {
    Développement_logiciel,
    Intelligence_artificielle_et_apprentissage_automatique,
    Sécurité_informatique,
    Développement_mobile,
    Programmation_avancée,
    Technologies_émergentes,
    Gestion_de_projet_et_DevOps
}