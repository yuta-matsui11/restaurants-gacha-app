package com.example.backend.service;

import com.example.backend.entity.Favorite;
import com.example.backend.repository.FavoriteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

//お気に入りの処理
@Service
@RequiredArgsConstructor
public class Favoriteservice {

    private final FavoriteRepository favoriteRepository;

    // お気に入り一覧取得
    public List<Favorite> getList(Long userId) {
        return favoriteRepository.findByUserId(userId);
    }

    // 登録済み確認
    public boolean isRegistered(Long userId, String restaurantId) {
        return favoriteRepository.existsByUserIdAndRestaurantId(userId, restaurantId);
    }

    // お気に入り登録
    @Transactional
    public Favorite add(Long userId, String restaurantId) {
        if (favoriteRepository.existsByUserIdAndRestaurantId(userId, restaurantId)) {
            throw new IllegalStateException("既にお気に入りに登録されています");
        }
        return favoriteRepository.save(Favorite.builder()
                .userId(userId)
                .restaurantId(restaurantId)
                .build());
    }

    // お気に入り解除
    @Transactional
    public void remove(Long userId, String restaurantId) {
        favoriteRepository.deleteByUserIdAndRestaurantId(userId, restaurantId);
    }

}
