package com.example.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.backend.entity.Favorite;
import java.util.List;

public interface FavoriteRepository extends JpaRepository<Favorite, Long> {

    List<Favorite> findByUserId(Long user_id);

    void deleteByUserIdAndShopId(Long user_id, Long restaurant_id);
}
//お気に入りのテーブルへのアクセスを担当するリポジトリです