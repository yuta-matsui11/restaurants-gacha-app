package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
//ガチャ履歴のエンティティ

@Entity
@Table(name = "gacha_history")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GachaHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "history_id")
    private Long historyId;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "station_name", nullable = false, length = 100)
    private String stationName;

    @Column(name = "restaurant_id", nullable = false, length = 50)
    private String restaurantId;

    @Column(name = "genre_name", length = 100)
    private String genreName;

    @Column(name = "gacha_at", nullable = false)
    @Builder.Default
    private LocalDateTime gachaAt = LocalDateTime.now();

    @Column(name = "restaurant_name", length = 200)
    private String restaurantName;

    @Column(name = "image_url", length = 500)
    private String imageUrl;

}
