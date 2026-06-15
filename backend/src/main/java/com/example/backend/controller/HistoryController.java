package com.example.backend.controller;

import com.example.backend.entity.GachaHistory;
import com.example.backend.service.HistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpStatus;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/history")
public class HistoryController {

    @Autowired
    private HistoryService historyService;

    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getHistoryByUserId(
        @PathVariable("userId") Long userId,
        HttpSession session) {

        Long loginUserId = (Long) session.getAttribute("LOGIN_USER_ID");

        if (loginUserId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("ログインしてください");
        }

        if (!loginUserId.equals(userId)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body("アクセス権限がありません");
        }

        List<GachaHistory> historyList = historyService.getHistoryByUserId(userId);
        return ResponseEntity.ok(historyList);
    }

    @GetMapping("/user/{userId}/genre-count")
    public ResponseEntity<?> getGenreCount(
        @PathVariable("userId") Long userId,
        HttpSession session) {

        Long loginUserId = (Long) session.getAttribute("LOGIN_USER_ID");

        if (loginUserId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("ログインしてください");
        }

        // 一時的にコメントアウトして確認
        // if (!loginUserId.equals(userId)) {
        //     return ResponseEntity.status(HttpStatus.FORBIDDEN)
        //             .body("アクセス権限がありません");
        // }

        List<GachaHistory> historyList = historyService.getAllHistoryByUserId(userId);

        Map<String, Integer> genreCount = new HashMap<>();
        for (GachaHistory history : historyList) {
            if (history.getGenreName() != null) {
                genreCount.merge(history.getGenreName(), 1, Integer::sum);
            }
        }

        return ResponseEntity.ok(genreCount);
    }
}