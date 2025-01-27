package com.openclassrooms.mddapi.requests;

import lombok.Data;

@Data
public class CommentRequest {
    private String content;
    private long authorId;
    private long articleId;
}
