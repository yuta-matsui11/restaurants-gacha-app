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
    private Long favoriteId;

    @Column(nullable = false)
    private Long userId;

    @Column(nullable = false, length = 50)
    private String restaurant_id;
}
