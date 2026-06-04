package com.example.backend.controller;

//履歴のAPIエンドポイント

import com.example.backend.entity.GachaHistory;
import com.example.backend.service.HistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * ガチャ履歴に関するAPIリクエスト（エンドポイント）を受け付けるコントローラー・クラス
 */
@RestController
@RequestMapping("/api/history")
public class HistoryController {

    @Autowired
    private HistoryService historyService;

    /**
     * 1. ガチャ履歴の保存エンドポイント
     * フロントエンドからガチャの結果を受け取り、データベースに保存します。
     * URL例: POST http://localhost:8080/api/history/save?user_id=1&station_name=品川駅
     *
     * @param user_id      ガチャを実行したユーザーのID
     * @param station_name ガチャの対象となった駅名
     * @param gachaResult  フロントエンドから送られてくるガチャの抽選結果(JSON)
     * @return 保存された履歴情報 (HTTP 200 OK)
     */
    /**
     * 2. 特定ユーザーのガチャ履歴一覧取得エンドポイント
     * マイページなどで表示するために、指定されたユーザーIDの過去の履歴を一覧で返却します。
     * URL例: GET http://localhost:8080/api/history/user/1
     *
     * @param user_id 履歴を取得したいユーザーのID
     * @return ガチャ履歴のリスト (HTTP 200 OK)
     */
    @GetMapping
    public ResponseEntity<List<GachaHistory>> getHistoryByUserId(@PathVariable Long userId) {
        List<GachaHistory> historyList = historyService.getHistoryByUserId(userId);
        return ResponseEntity.ok(historyList);
    }
}