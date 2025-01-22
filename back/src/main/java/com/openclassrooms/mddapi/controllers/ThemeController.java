package com.openclassrooms.mddapi.controllers;

import com.openclassrooms.mddapi.models.Subscription;
import com.openclassrooms.mddapi.models.Theme;
import com.openclassrooms.mddapi.repository.SubscriptionRepository;
import com.openclassrooms.mddapi.repository.ThemeRepository;
import com.openclassrooms.mddapi.services.SubscriptionService;
import com.openclassrooms.mddapi.services.ThemeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/theme")
public class ThemeController {

    @Autowired
    private SubscriptionService subscriptionService;

    @Autowired
    private ThemeService themeService;

    @GetMapping("/{userId}")
    public List<Theme> getUnsubscribedThemes(@PathVariable Long userId) {
        // Récupérer les abonnements de l'utilisateur
        List<Subscription> subscriptions = subscriptionService.findByUserId(userId);
        System.out.println("mes abonnements : "+subscriptions);
        // Extraire les IDs des thèmes auxquels l'utilisateur est déjà abonné
        List<Long> subscribedThemeIds = subscriptions.stream()
                .map(Subscription::getThemeId)
                .collect(Collectors.toList());
        System.out.println(subscribedThemeIds);
        // Récupérer les thèmes auxquels l'utilisateur n'est pas abonné
        List<Theme> unsubscribedThemes;


            unsubscribedThemes = themeService.findByIdNotIn(subscribedThemeIds);
        System.out.println(unsubscribedThemes);

        return unsubscribedThemes;
    }


}
