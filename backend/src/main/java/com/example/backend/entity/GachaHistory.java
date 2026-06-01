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
    private Long historyId;

    @Column(nullable = false)
    private Long userId;

    @Column(nullable = false, length = 100)
    private String station_name;

    @Column(nullable = false, length = 50)
    private String restaurant_id;

    @Column(length = 100)
    private String genre_name;

    @Column(nullable = false)
    @Builder.Default
    private LocalDateTime gacha_at = LocalDateTime.now();

}
