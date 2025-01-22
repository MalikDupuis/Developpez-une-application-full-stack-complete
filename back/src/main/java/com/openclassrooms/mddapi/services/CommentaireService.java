package com.openclassrooms.mddapi.services;

import com.openclassrooms.mddapi.models.Commentaire;
import com.openclassrooms.mddapi.repository.CommentaireRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentaireService {
    @Autowired
    private CommentaireRepository commentaireRepository;

    public List<Commentaire> getAllCommentairesByArticleId(long articleId) {
        return commentaireRepository.findByArticleId(articleId);
    }

    public void saveCommentaire(Commentaire commentaire) {
        commentaireRepository.save(commentaire);
    }
}
