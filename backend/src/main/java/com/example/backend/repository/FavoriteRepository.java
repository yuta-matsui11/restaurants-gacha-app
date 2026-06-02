package com.example.backend.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.backend.entity.Favorite;


public interface FavoriteRepository extends JpaRepository<Favorite, Long> {

    List<Favorite> findByUserId(Long userId);

    boolean existsByUserIdAndRestaurantId(
            Long userId,
            String restaurantId
    );

    void deleteByUserIdAndRestaurantId(
            Long userId,
            String restaurantId
    );

}