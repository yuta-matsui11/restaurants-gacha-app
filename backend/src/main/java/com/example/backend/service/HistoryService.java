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
     * ユーザーがガチャを引いた際に、その結果を履歴としてデータベースに保存します。
     * * @param user_id ガチャを引いたユーザーのID
     * @param station_name ガチャを引いた対象の駅名
     * @param gachaResult ガチャの抽選結果DTO (Dtos.GachaResponse)
     * @return 保存されたガチャ履歴エンティティ
     */
    @Transactional
    public GachaHistory saveHistory(Long user_id, String station_name, Dtos.GachaResponse gachaResult) {
        GachaHistory history = new GachaHistory();
        
        // 1. GachaHistoryエンティティのフィールド定義に合わせてデータをセット
        history.setUser_id(user_id);
        history.setStation_name(station_name);
        history.setRestaurant_id(gachaResult.restaurant_id);
        // ※Dtos.GachaResponseにgenre_nameが含まれていないため、
        // 必要に応じてnullをセットするか、将来の拡張用としてここではいったんnull（または省略）として扱います
        history.setGenre_name(null);
        
        // gacha_at は GachaHistory.java 側で @Builder.Default により 
        // LocalDateTime.now() が自動セットされるため、ここではセット不要です

        // 2. リポジトリ経由で保存
        return gachaHistoryRepository.save(history);
    }

    /**
     * 2. 特定ユーザーのガチャ履歴一覧取得処理
     * マイページ等で表示するために、該当ユーザーの過去の履歴をすべて取得します。
     * * @param user_id 履歴を取得したいユーザーのID
     * @return ガチャ履歴のリスト
     */
    @Transactional(readOnly = true)
    public List<GachaHistory> getHistoryByUserId(Long user_id) {
        // GachaHistoryRepositoryに定義されている正しいメソッド「findByUserId」を呼び出します
        return gachaHistoryRepository.findByUserId(user_id);
    }
}