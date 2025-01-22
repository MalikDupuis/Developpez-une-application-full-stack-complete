package com.openclassrooms.mddapi.services;

import com.openclassrooms.mddapi.models.Subscription;
import com.openclassrooms.mddapi.repository.SubscriptionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SubscriptionService {
    @Autowired
    private SubscriptionRepository subscriptionRepository;

    public void save(Subscription subscription) {
        subscriptionRepository.save(subscription);
    }

    public List<Subscription> findByUserId(long userId) {
        return subscriptionRepository.findByUserId(userId);
    }

    public Optional<Subscription> findById(long id) {
        return subscriptionRepository.findById(id);
    }
    public void delete(long id) {
        subscriptionRepository.deleteById(id);
    }

    public Subscription findSubscriptionByThemeIdAndUserId(long themeId, long userId) {
        return subscriptionRepository.findByThemeIdAndUserId(themeId,userId);
    }


}
