package com.openclassrooms.mddapi.controllers;

import com.openclassrooms.mddapi.models.Article;
import com.openclassrooms.mddapi.models.Subscription;
import com.openclassrooms.mddapi.models.Theme;
import com.openclassrooms.mddapi.models.User;
import com.openclassrooms.mddapi.repository.ArticleRepository;
import com.openclassrooms.mddapi.repository.SubscriptionRepository;
import com.openclassrooms.mddapi.requests.ArticleRequest;
import com.openclassrooms.mddapi.requests.RegisterRequest;
import com.openclassrooms.mddapi.response.ArticleResponse;
import com.openclassrooms.mddapi.response.JwtResponse;
import com.openclassrooms.mddapi.response.MessageResponse;
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
        System.out.println("User ID: " + userId);

        // Récupérer les abonnements de l'utilisateur
        List<Subscription> subscriptions = subscriptionRepository.findByUserId(userId);
        System.out.println("Subscriptions: " + subscriptions);

        // Extraire les IDs des thèmes des abonnements
        List<Long> themeIds = subscriptions.stream()
                .map(Subscription::getThemeId)
                .collect(Collectors.toList());
        System.out.println("Theme IDs: " + themeIds);

        // Récupérer et retourner les articles correspondant aux IDs des thèmes
        List<Article> articles = articleRepository.findByThemeIdIn(themeIds);
        System.out.println("Articles: " + articles);

        return articles;
    }


    @GetMapping("/detail/{articleId}")
    public ResponseEntity<ArticleResponse> getArticleById(@PathVariable Long articleId) {
        System.out.println(articleId);
        Article article = articleRepository.findById(articleId).orElse(null);
        if (article == null) {
            return ResponseEntity.notFound().build();
        }
        ArticleResponse articleResponse = new ArticleResponse();
        articleResponse.setTitle(article.getTitle());
        articleResponse.setContent(article.getContent());
        articleResponse.setThemeId(article.getThemeId());
        articleResponse.setAuthor(article.getAuthor());
        articleResponse.setCreated(article.getCreated());
        return ResponseEntity.ok(articleResponse);
    }

    @PostMapping()
    public ResponseEntity<?> createArticle(@RequestBody ArticleRequest articleRequest) {
        if (articleRequest == null) {
            return ResponseEntity.badRequest().body("Invalid request");
        }
        Article article = new Article();
        article.setTitle(articleRequest.getTitle());
        article.setContent(articleRequest.getContent());
        article.setThemeId(articleRequest.getThemeId());
        article.setAuthor(articleRequest.getAuthor());
        articleService.save(article);
        return ResponseEntity.ok().body(new MessageResponse("Article created successfully"));
    }
}
