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
    @Column(length = 20)
    private String genre_id;

    @Column(nullable = false, length = 50)
    private String genre_name;

}
