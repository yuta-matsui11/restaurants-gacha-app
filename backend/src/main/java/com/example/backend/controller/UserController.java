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
}