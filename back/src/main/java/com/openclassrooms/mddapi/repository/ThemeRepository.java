package com.openclassrooms.mddapi.repository;

import com.openclassrooms.mddapi.models.Theme;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Repository
public class ThemeRepository {
    public static List<Theme> getThemes() {
        return Arrays.asList(
                new Theme(1,"Développement logiciel", "Conception, développement et maintenance de logiciels."),
                new Theme(2,"Intelligence artificielle et apprentissage automatique", "Techniques et outils pour créer des systèmes intelligents."),
                new Theme(3,"Sécurité informatique", "Protection des systèmes et données contre les cybermenaces."),
                new Theme(4,"Développement mobile", "Création d'applications pour smartphones et tablettes."),
                new Theme(5,"Programmation avancée", "Concepts avancés et techniques de programmation."),
                new Theme(6,"Technologies émergentes", "Exploration des technologies de pointe en informatique."),
                new Theme(7,"Gestion de projet et DevOps", "Méthodes et outils pour gérer les projets et l'intégration continue.")
        );
    }

    public List<Theme> findByIdNotIn(List<Long> ids) {
        if (ids == null || ids.isEmpty()) {
            // Si la liste est vide, retourner tous les thèmes
            return getThemes();
        }
        // Sinon, filtrer les thèmes en excluant ceux dont l'ID est dans la liste
        return getThemes().stream()
                .filter(theme -> !ids.contains(theme.getId()))
                .collect(Collectors.toList());
    }

    public List<Theme> findByIdIn(List<Long> ids) {
        if (ids == null || ids.isEmpty()) {
            // Si la liste est vide, retourner tous les thèmes
            return new ArrayList<>();
        }
        // Sinon, filtrer les thèmes en excluant ceux dont l'ID est dans la liste
        return getThemes().stream()
                .filter(theme -> ids.contains(theme.getId()))
                .collect(Collectors.toList());
    }

    public String findById(long id) {
        return getThemes().stream()
                .filter(theme -> theme.getId() == id)
                .map(Theme::getTitle)
                .findFirst()
                .orElse(null); // Retourne null si aucun thème ne correspond
    }



}
