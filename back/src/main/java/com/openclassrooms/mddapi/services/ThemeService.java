package com.openclassrooms.mddapi.services;

import com.openclassrooms.mddapi.models.Theme;
import com.openclassrooms.mddapi.repository.ThemeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ThemeService {
    @Autowired
    private ThemeRepository themeRepository;

    public String getThemeTitleById(long id) {
        return themeRepository.findById(id);
    }

    public List<Theme> findByIdIn(List<Long> ids) {
        return themeRepository.findByIdIn(ids);
    }

    public List<Theme> findByIdNotIn(List<Long> ids) {
        return themeRepository.findByIdNotIn(ids);
    }


}
