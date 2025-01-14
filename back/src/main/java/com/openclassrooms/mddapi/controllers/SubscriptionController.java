package com.openclassrooms.mddapi.controllers;

import com.openclassrooms.mddapi.models.Subscription;
import com.openclassrooms.mddapi.models.Theme;
import com.openclassrooms.mddapi.repository.ThemeRepository;
import com.openclassrooms.mddapi.requests.SubscriptionRequest;
import com.openclassrooms.mddapi.response.SubscriptionResponse;
import com.openclassrooms.mddapi.response.ThemeResponse;
import com.openclassrooms.mddapi.services.SubscriptionService;
import com.openclassrooms.mddapi.services.ThemeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/subscription")
public class SubscriptionController {
    @Autowired
    private SubscriptionService subscriptionService;

    @Autowired
    private ThemeRepository themeRepository;

    @PostMapping()
    public ResponseEntity<?> subscribe(@RequestBody SubscriptionRequest subscriptionRequest) {
        System.out.println(subscriptionRequest);
        Subscription subscription = new Subscription();
        subscription.setUserId(subscriptionRequest.getUserId());
        subscription.setThemeId(subscriptionRequest.getThemeId());
        subscriptionService.save(subscription);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{userId}")
    public List<ThemeResponse> getUnsubscribedThemes(@PathVariable long userId) {
        // Récupérer tous les abonnements de l'utilisateur
        List<Subscription> subscriptions = subscriptionService.findByUserId(userId);

        // Extraire les IDs des thèmes auxquels l'utilisateur est déjà abonné
        List<Long> subscribedThemeIds = subscriptions.stream()
                .map(Subscription::getThemeId)
                .collect(Collectors.toList());

        // Récupérer tous les thèmes disponibles
        List<Theme> allThemes = themeRepository.getThemes();

        // Filtrer les thèmes pour exclure ceux déjà abonnés
        List<Theme> unsubscribedThemes = allThemes.stream()
                .filter(theme -> !subscribedThemeIds.contains(theme.getId()))
                .collect(Collectors.toList());

        // Convertir les thèmes non abonnés en réponses (DTO)
        return unsubscribedThemes.stream()
                .map(theme -> new ThemeResponse(
                        theme.getId(),
                        theme.getTitle(),
                        theme.getDescription()
                ))
                .collect(Collectors.toList());
    }


    @DeleteMapping("/{subscriptionId}")
    public ResponseEntity<?> unsubscribe(@PathVariable long subscriptionId) {
        if (subscriptionService.findById(subscriptionId).isPresent()) {
            subscriptionService.delete(subscriptionId);
            return ResponseEntity.ok().build();
        }

        return ResponseEntity.notFound().build();

    }
}
