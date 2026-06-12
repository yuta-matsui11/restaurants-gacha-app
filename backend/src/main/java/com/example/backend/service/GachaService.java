package com.example.backend.service;

import com.example.backend.entity.GachaHistory;
import com.example.backend.external.HeartRailsStationService;
import com.example.backend.external.RestaurantInfo;
import com.example.backend.external.RestaurantService;
import com.example.backend.repository.GachaHistoryRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
// ガチャの処理
public class GachaService {
    private static final int MAX_HISTORY = 100;

    private final RestaurantService restaurantService;
    private final HeartRailsStationService heartRailsStationService;
    private final GachaHistoryRepository historyRepository;

    @Transactional
    public RestaurantInfo execute(Long userId, String stationName, String genre) {
        // 1. 駅名 → 緯度経度変換.
        double[] coords = heartRailsStationService.getCoordinates(stationName);

        // 2. HotPepper APIで店舗一覧取得
        List<RestaurantInfo> restaurants = restaurantService.search(coords[0], coords[1], genre);

        if (restaurants.isEmpty()) {
            throw new NoRestaurantException("条件に一致するお店が見つかりませんでした");
        }

        // 3. ランダム抽選
        Collections.shuffle(restaurants);
        RestaurantInfo selected = restaurants.get(0);

        // 4. 履歴保存（100件超えたら最古を削除）
        List<GachaHistory> histories = historyRepository.findByUserId(userId);
        if (histories.size() >= MAX_HISTORY) {
            histories.stream()
                    .min((a, b) -> a.getGachaAt().compareTo(b.getGachaAt()))
                    .ifPresent(historyRepository::delete);
        }

        historyRepository.save(GachaHistory.builder()
                .userId(userId)
                .stationName(stationName)
                .restaurantId(selected.getId())
                .genreName(selected.getGenre_name())
                .restaurantName(selected.getName())
                .imageUrl(selected.getImageUrl())
                .build());

        log.info("Gacha executed: userId={}, station={}, restaurant={}", userId, stationName, selected.getName());
        return selected;
    }

    @Transactional
    public RestaurantInfo getRestDetailbyId(String restaurantId) {
        RestaurantInfo restaurant = restaurantService.getDetail(restaurantId);

        return restaurant;
    }

    public static class NoRestaurantException extends RuntimeException {
        public NoRestaurantException(String message) {
            super(message);
        }
    }

}
