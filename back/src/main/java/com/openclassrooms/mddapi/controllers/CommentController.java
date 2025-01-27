package com.openclassrooms.mddapi.controllers;

import com.openclassrooms.mddapi.models.Article;
import com.openclassrooms.mddapi.models.Commentaire;
import com.openclassrooms.mddapi.requests.ArticleRequest;
import com.openclassrooms.mddapi.requests.CommentRequest;
import com.openclassrooms.mddapi.response.MessageResponse;
import com.openclassrooms.mddapi.services.ArticleService;
import com.openclassrooms.mddapi.services.CommentaireService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/comment")
public class CommentController {
    @Autowired
    private CommentaireService commentaireService;

    @PostMapping()
    public ResponseEntity<?> createComment(@RequestBody CommentRequest commentRequest) {

        if (commentRequest == null) {
            return ResponseEntity.badRequest().body("Invalid request");
        }
        Commentaire commentaire = new Commentaire();
        commentaire.setAuthorId(commentRequest.getAuthorId());
        commentaire.setArticleId(commentRequest.getArticleId());
        commentaire.setContent(commentRequest.getContent());
        commentaireService.saveCommentaire(commentaire);
        return ResponseEntity.ok().body(new MessageResponse("Comment created successfully"));
    }
}
