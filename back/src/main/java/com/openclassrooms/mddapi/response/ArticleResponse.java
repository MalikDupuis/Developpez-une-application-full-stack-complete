package com.openclassrooms.mddapi.response;

import com.openclassrooms.mddapi.models.Theme;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class ArticleResponse {
    private long themeId;
    private String title;
    private String author;
    private String content;
    private Date created;
}
