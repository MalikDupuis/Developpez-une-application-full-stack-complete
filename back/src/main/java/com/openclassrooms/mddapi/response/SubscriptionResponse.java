package com.openclassrooms.mddapi.response;

import com.openclassrooms.mddapi.models.Theme;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SubscriptionResponse {
    private long themeId;
    private long id;
}
