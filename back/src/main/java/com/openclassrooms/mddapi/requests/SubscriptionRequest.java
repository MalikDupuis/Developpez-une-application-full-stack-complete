package com.openclassrooms.mddapi.requests;

import com.openclassrooms.mddapi.models.Theme;
import lombok.Data;

@Data
public class SubscriptionRequest {
    private long userId;
    private long themeId;
}
