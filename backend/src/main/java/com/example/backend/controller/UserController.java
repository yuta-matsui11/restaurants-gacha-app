package com.example.backend.controller;

import com.example.backend.entity.User;
import com.example.backend.repository.UserRepository;

import jakarta.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/me")
    public ResponseEntity<?> getMyProfile(HttpSession session) {

        Long userId = (Long) session.getAttribute("LOGIN_USER_ID");

        if (userId == null) {
            return ResponseEntity.status(401).body("未ログインです");
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("ユーザーが見つかりません"));

        Map<String, Object> response = new HashMap<>();

        response.put("user_id", user.getUser_id());
        response.put("user_name", user.getUser_name());
        response.put("email", user.getEmail());
        response.put("nearest_station", user.getNearest_station());
        response.put("favorite_genre_id", user.getFavorite_genre_id());

        return ResponseEntity.ok(response);
    }

    //ユーザー情報編集機能
    @PutMapping("/me")
    public ResponseEntity<?> updateMyProfile(@RequestBody UserUpdateRequest request, HttpSession session) {
        
        // 1. セッションからログイン中のユーザーIDを取得
        Long userId = (Long) session.getAttribute("LOGIN_USER_ID");

        if (userId == null) {
            return ResponseEntity.status(401).body("未ログインです");
        }

        // 2. データベースから該当ユーザーを取得
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("ユーザーが見つかりません"));

        // 3. フロントエンドから送られてきた値でユーザー情報を上書き
        // ※Userエンティティのセッターメソッド名は、実際の定義に合わせて調整してください
        user.setUser_name(request.uname);
        user.setEmail(request.email);
        user.setNearest_station(request.station);
        user.setFavorite_genre_id(request.genre);

        // 4. データベースに保存
        userRepository.save(user);

        return ResponseEntity.ok(Map.of("message", "プロフィールを更新しました"));
    }

    // --- 新規追加: リクエストを受け取るためのクラス ---
    // Profile.jsx の editData とキー名（uname, email, station, genre）を完全に一致させます
    static class UserUpdateRequest {
        public String uname;
        public String email;
        public String station;
        public String genre;
    }
}