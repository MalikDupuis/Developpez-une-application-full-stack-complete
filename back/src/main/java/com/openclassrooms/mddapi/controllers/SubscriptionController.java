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
        List<Theme> subscribedThemes;


        subscribedThemes = themeRepository.findByIdIn(subscribedThemeIds);
        System.out.println(subscribedThemes);

        return subscribedThemes;
    }


    @DeleteMapping("/{themeId}/{userId}")
    public ResponseEntity<?> unsubscribe(@PathVariable long themeId, @PathVariable Long userId) {
        Subscription subscription = subscriptionService.findSubscriptionByThemeIdAndUserId(themeId,userId);
            if(subscription != null) {
                subscriptionService.delete(subscription.getId());
                return ResponseEntity.ok().build();
            }
        return ResponseEntity.notFound().build();
        }




}
