package com.openclassrooms.mddapi.controllers;

import com.openclassrooms.mddapi.models.Subscription;
import com.openclassrooms.mddapi.requests.SubscriptionRequest;
import com.openclassrooms.mddapi.response.SubscriptionResponse;
import com.openclassrooms.mddapi.services.SubscriptionService;
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

    @PostMapping()
    public ResponseEntity<?> subscribe(@RequestBody SubscriptionRequest subscriptionRequest) {
        System.out.println(subscriptionRequest);
        Subscription subscription = new Subscription();
        subscription.setUserId(subscriptionRequest.getUserId());
        subscription.setTheme(subscriptionRequest.getTheme());
        subscriptionService.save(subscription);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{userId}")
    public List<SubscriptionResponse> getAllMySubscriptions(@PathVariable long userId) {
        return subscriptionService.findByUserId(userId).stream()
                .map(subscription -> new SubscriptionResponse(
                        subscription.getTheme(),
                        subscription.getId()
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
