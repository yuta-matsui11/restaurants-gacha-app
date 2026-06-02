package com.example.backend.controller;

import com.example.backend.external.HeartRailsStationService;
import com.example.backend.external.RestaurantInfo;
import com.example.backend.service.GachaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/gacha")
@RequiredArgsConstructor
// ガチャのAPIエンドポイント.
public class GachaController {
    private final GachaService gachaService;

    @PostMapping("/execute")
    public ResponseEntity<?> execute(@RequestBody GachaRequest req) {
        try {
            RestaurantInfo result = gachaService.execute(req.userId, req.stationName);
            return ResponseEntity.ok(result);
        } catch (HeartRailsStationService.StationNotFoundException e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        } catch (GachaService.NoRestaurantException e) {
            return ResponseEntity.status(404).body(Map.of("message", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("message", "エラーが発生しました"));
        }
    }

    static class GachaRequest {
        public Long userId;
        public String stationName;
    }
}
