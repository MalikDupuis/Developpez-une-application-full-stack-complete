package com.openclassrooms.mddapi.response;

import com.openclassrooms.mddapi.models.Commentaire;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Getter
@Setter
public class ArticleResponse {
    private String theme;
    private String title;
    private String author;
    private String content;
    private Date created;
    private List<CommentsResponse> comments;
}
