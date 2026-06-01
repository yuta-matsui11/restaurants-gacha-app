package com.example.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.backend.entity.User;

//userテーブルへのアクセスを担当するリポジトリ
public interface UserRepository extends JpaRepository<User, Long> {

    User findByEmail(String email);
}
