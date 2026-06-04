package com.example.backend.controller;

import com.example.backend.entity.Favorite;
import com.example.backend.service.Favoriteservice;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/favorites")
@RequiredArgsConstructor
// お気に入りのAPIエンドポイント
public class FavoriteController {

    private final Favoriteservice favoriteService;

    // お気に入り一覧取得
    // GET /api/favorites?userId=1
    @GetMapping
    public ResponseEntity<List<Favorite>> getList(@RequestParam Long userId) {
        return ResponseEntity.ok(favoriteService.getList(userId));
    }

    // 登録済み確認
    // GET /api/favorites/check?userId=1&restaurantId=J001234567
    @GetMapping("/check")
    public ResponseEntity<Map<String, Boolean>> check(
            @RequestParam Long userId,
            @RequestParam String restaurantId) {
        return ResponseEntity.ok(Map.of("registered",
                favoriteService.isRegistered(userId, restaurantId)));
    }

    // お気に入り登録
    // POST /api/favorites
    // リクエスト: { "userId": 1, "restaurantId": "J001234567" }
    @PostMapping
    public ResponseEntity<?> add(@RequestBody FavoriteRequest req) {
        try {
            return ResponseEntity.ok(favoriteService.add(req.userId, req.restaurantId));
        } catch (IllegalStateException e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    // お気に入り解除
    // DELETE /api/favorites/J001234567?userId=1
    @DeleteMapping("/{restaurantId}")
    public ResponseEntity<?> remove(
            @PathVariable String restaurantId,
            @RequestParam Long userId) {
        favoriteService.remove(userId, restaurantId);
        return ResponseEntity.ok(Map.of("message", "お気に入りを解除しました"));
    }

    static class FavoriteRequest {
        public Long userId;
        public String restaurantId;
    }

}
