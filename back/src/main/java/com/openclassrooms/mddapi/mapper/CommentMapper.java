package com.openclassrooms.mddapi.mapper;

import com.openclassrooms.mddapi.models.Commentaire;
import com.openclassrooms.mddapi.response.CommentsResponse;

public class CommentMapper {
    public static CommentsResponse toResponse(Commentaire commentaire, String authorName) {
        CommentsResponse response = new CommentsResponse();
        response.setId(commentaire.getId());
        response.setArticleId(commentaire.getArticleId());
        response.setAuthor(authorName); // Vous devez obtenir le nom de l'auteur
        response.setContent(commentaire.getContent());
        return response;
    }
}
