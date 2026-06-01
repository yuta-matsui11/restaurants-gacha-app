package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

//ユーザのエンティティ
@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long user_id;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false, length = 100)
    private String user_name;

    @Column(length = 200)
    private String profileImage;

    @Column(length = 100)
    private String nearest_station;

    @Column(length = 50)
    private String favorite_genre_id;

    @Column(nullable = false)
    @Builder.Default
    private LocalDateTime created_at = LocalDateTime.now();

}
