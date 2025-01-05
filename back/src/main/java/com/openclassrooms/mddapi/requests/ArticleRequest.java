package com.openclassrooms.mddapi.requests;

import com.openclassrooms.mddapi.models.Theme;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ArticleRequest {
    private String title;
    private String author;
    private Theme theme;
    private String content;

}
