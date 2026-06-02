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
    public List<Favorite> getList(Long user_id) {
        return favoriteRepository.findByUser_id(user_id);
    }

    // 登録済み確認
    public boolean isRegistered(Long user_id, String restaurant_id) {
        return favoriteRepository.existsByUser_idAndRestaurant_id(user_id, restaurant_id);
    }

    // お気に入り登録
    @Transactional
    public Favorite add(Long user_id, String restaurant_id) {
        if (favoriteRepository.existsByUser_idAndRestaurant_id(user_id, restaurant_id)) {
            throw new IllegalStateException("既にお気に入りに登録されています");
        }
        return favoriteRepository.save(Favorite.builder()
                .user_id(user_id)
                .restaurant_id(restaurant_id)
                .build());
    }

    // お気に入り解除
    @Transactional
    public void remove(Long user_id, String restaurant_id) {
        favoriteRepository.deleteByUser_idAndRestaurant_id(user_id, restaurant_id);
    }

}
