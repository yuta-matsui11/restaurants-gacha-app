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
    private Long favorite_id;

    @Column(nullable = false)
    private Long user_id;

    @Column(nullable = false, length = 50)
    private String restaurant_id;
}
