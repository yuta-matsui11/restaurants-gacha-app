package com.example.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.backend.entity.Favorite;
import java.util.List;
import java.util.Optional;

public interface FavoriteRepository extends JpaRepository<Favorite, Long> {

    List<Favorite> findByUser_id(Long user_id);

    Optional<Favorite> findByUser_idAndRestaurant_id(Long user_id, String restaurant_id);

    boolean existsByUser_idAndRestaurant_id(Long user_id, String restaurant_id);

    void deleteByUser_idAndRestaurant_id(Long user_id, String restaurant_id);
}