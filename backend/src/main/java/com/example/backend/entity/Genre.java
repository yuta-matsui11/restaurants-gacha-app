package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.*;

//ジャンルのエンティティ
@Entity
@Table(name = "genres")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Genre {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long genre_id;

    @Column(nullable = false, length = 50)
    private String genre_name;

}
