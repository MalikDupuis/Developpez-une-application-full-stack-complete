package com.openclassrooms.mddapi.services;

import com.openclassrooms.mddapi.models.Article;
import com.openclassrooms.mddapi.models.Commentaire;
import com.openclassrooms.mddapi.models.User;
import com.openclassrooms.mddapi.repository.ArticleRepository;
import com.openclassrooms.mddapi.response.CommentsResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ArticleService {
    @Autowired
    private ArticleRepository articleRepository;

    public void save(Article article) {
        articleRepository.save(article);
    }

    public List<Article> findByThemeIdIn(List<Long> themeIds) {
        return articleRepository.findByThemeIdIn(themeIds);
    }

    public Article findById(Long articleId) {
        return articleRepository.findById(articleId).orElse(null);
    }


}
