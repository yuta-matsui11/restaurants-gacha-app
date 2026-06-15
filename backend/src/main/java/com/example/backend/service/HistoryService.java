package com.example.backend.service;

// 履歴の処理

import com.example.backend.entity.GachaHistory;
import com.example.backend.repository.GachaHistoryRepository;
import com.example.backend.dto.Dtos;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * ガチャ履歴の保存・取得処理を担当するサービス・クラス
 */
@Service
public class HistoryService {

    @Autowired
    private GachaHistoryRepository gachaHistoryRepository;

    /**
     * 1. ガチャ履歴の保存処理
     */
    @Transactional
    public GachaHistory saveHistory(Long user_id, String station_name, Dtos.GachaResponse gachaResult) {
        GachaHistory history = new GachaHistory();

        history.setUserId(user_id);
        history.setStationName(station_name);
        history.setRestaurantId(gachaResult.restaurant_id);
        history.setGenreName(null);

        return gachaHistoryRepository.save(history);
    }

    /**
     * 2. 特定ユーザーのガチャ履歴一覧取得処理（上限あり）
     */
    @Transactional(readOnly = true)
    public List<GachaHistory> getHistoryByUserId(Long user_id) {
        return gachaHistoryRepository.findByUserId(user_id);
    }

    /**
     * 3. 特定ユーザーの全履歴取得処理（バッジ集計用・上限なし）
     */
    @Transactional(readOnly = true)
    public List<GachaHistory> getAllHistoryByUserId(Long user_id) {
        return gachaHistoryRepository.findByUserId(user_id);
    }
}