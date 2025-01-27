package com.openclassrooms.mddapi.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CommentsResponse {
    private Long id;
    private long articleId;
    private String author;
    private String content;
}
