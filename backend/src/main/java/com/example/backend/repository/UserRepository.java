package com.example.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.backend.entity.User;
import java.util.Optional;

//userテーブルへのアクセスを担当するリポジトリ
public interface UserRepository extends JpaRepository<User, Long> {

    // メールアドレスでユーザーを検索するメソッド（戻り値をOptionalにして安全にする）
    Optional<User> findByEmail(String email);

    // メールアドレスが既に登録されているかチェックするメソッド（追加）
    boolean existsByEmail(String email);
    
}
