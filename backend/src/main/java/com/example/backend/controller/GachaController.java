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
            RestaurantInfo result = gachaService.execute(req.user_id, req.station_name, req.genre);
            return ResponseEntity.ok(result);
        } catch (HeartRailsStationService.StationNotFoundException e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        } catch (GachaService.NoRestaurantException e) {
            return ResponseEntity.status(404).body(Map.of("message", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("message", "エラーが発生しました"));
        }
    }

    @GetMapping("/restaurant/{restaurantId}")
    public ResponseEntity<?> getRestaurantdetail(@PathVariable("restaurantId") String restaurantId) {
       try{
        RestaurantInfo restaurant = gachaService.getRestDetailbyId(restaurantId);
        return ResponseEntity.ok(restaurant);
       }
       catch (Exception e){
        return ResponseEntity.status(404).body(Map.of("message", "店舗情報が見つかりませんでした"));
       }
    
    }
    

    static class GachaRequest {
        public Long user_id;
        public String station_name;
        public String genre; // 追加: ジャンルコード（例: "G001"）
    }
}
