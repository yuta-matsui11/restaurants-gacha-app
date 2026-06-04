package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.*;

//お気に入りのエンティティ

@Entity
@Table(name = "favorites", uniqueConstraints = @UniqueConstraint(columnNames = { "user_id", "restaurant_id" }))
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Favorite {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "favorite_id")
    private Long favoriteId;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "restaurant_id", nullable = false, length = 50)
    private String restaurantId;

    @Column(name = "station_name", length = 100)
    private String stationName;

    @Column(name = "genre_name", length = 100)
    private String genreName;

    @Column(name = "restaurant_name", length = 200)
    private String restaurantName;

    @Column(name = "image_url", length = 500)
    private String imageUrl;
}
