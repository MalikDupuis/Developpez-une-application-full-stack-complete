package com.openclassrooms.mddapi.deserializers;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.openclassrooms.mddapi.models.Theme;

import java.io.IOException;

public class ThemeDeserializer extends JsonDeserializer<Theme> {
    @Override
    public Theme deserialize(JsonParser p, DeserializationContext ctxt) throws IOException {
        String value = p.getText().replace(" ", "_"); // Remplace les espaces par des underscores
        return Theme.valueOf(value);
    }
}