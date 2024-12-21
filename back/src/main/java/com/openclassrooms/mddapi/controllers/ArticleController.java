package com.openclassrooms.mddapi.controllers;

import com.openclassrooms.mddapi.models.Article;
import com.openclassrooms.mddapi.models.Subscription;
import com.openclassrooms.mddapi.models.Theme;
import com.openclassrooms.mddapi.models.User;
import com.openclassrooms.mddapi.repository.ArticleRepository;
import com.openclassrooms.mddapi.repository.SubscriptionRepository;
import com.openclassrooms.mddapi.requests.RegisterRequest;
import com.openclassrooms.mddapi.response.JwtResponse;
import com.openclassrooms.mddapi.services.ArticleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/article")
public class ArticleController {
    @Autowired
    private ArticleService articleService;

    @Autowired
    private ArticleRepository articleRepository;

    @Autowired
    private SubscriptionRepository subscriptionRepository;

    @GetMapping("/{userId}")
    public List<Article> getArticlesBySubscription(@PathVariable Long userId) {
        System.out.println(userId);
        List<Subscription> subscriptions = subscriptionRepository.findByUserId(userId);
        System.out.println(subscriptions);
        List<Theme> themes = subscriptions.stream().map(Subscription::getTheme).collect(Collectors.toList());
        System.out.println(themes);
        System.out.println(articleRepository.findByThemeIn(themes));
        return articleRepository.findByThemeIn(themes);
    }
}
