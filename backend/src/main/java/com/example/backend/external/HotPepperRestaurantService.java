package com.example.backend.external;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
public class HotPepperRestaurantService implements RestaurantService {

    @Value("${hotpepper.api.key}")
    private String apiKey;

    @Value("${hotpepper.api.url}")
    private String apiUrl;

    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper = new ObjectMapper();

    /**
     * 緯度経度・ジャンルで飲食店一覧を検索する
     *
     * @param lat   緯度
     * @param lng   経度
     * @param genre ジャンルコード（空文字の場合は全ジャンル）
     */
    @Override
    public List<RestaurantInfo> search(double lat, double lng, String genre) {
        UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(apiUrl)
                .queryParam("key", apiKey)
                .queryParam("lat", lat)
                .queryParam("lng", lng)
                .queryParam("range", 3) // 1000m固定（1=300m,2=500m,3=1000m,4=2000m,5=3000m）
                .queryParam("count", 100)
                .queryParam("format", "json");

        // ジャンルコードが指定されていれば絞り込む
        if (genre != null && !genre.isBlank()) {
            builder.queryParam("genre", genre);
        }

        String url = builder.toUriString();
        log.info("HotPepper API search: lat={}, lng={}, genre={}", lat, lng, genre);

        try {
            String response = restTemplate.getForObject(url, String.class);
            return parseShopList(response);
        } catch (Exception e) {
            log.error("HotPepper API error", e);
            throw new RuntimeException("飲食店情報の取得に失敗しました");
        }
    }

    /**
     * 店舗IDで詳細情報を取得する
     */
    @Override
    public RestaurantInfo getDetail(String restaurant_id) {
        String url = UriComponentsBuilder.fromHttpUrl(apiUrl)
                .queryParam("key", apiKey)
                .queryParam("id", restaurant_id)
                .queryParam("format", "json")
                .toUriString();

        log.info("HotPepper API getDetail: id={}", restaurant_id);

        try {
            String response = restTemplate.getForObject(url, String.class);
            List<RestaurantInfo> list = parseShopList(response);
            if (list.isEmpty()) {
                throw new RuntimeException("店舗が見つかりません: " + restaurant_id);
            }
            return list.get(0);
        } catch (RuntimeException e) {
            throw e;
        } catch (Exception e) {
            log.error("HotPepper API getDetail error", e);
            throw new RuntimeException("店舗情報の取得に失敗しました");
        }
    }

    /**
     * APIレスポンスのJSONをRestaurantInfoリストに変換する
     */
    private List<RestaurantInfo> parseShopList(String json) throws Exception {
        List<RestaurantInfo> result = new ArrayList<>();
        JsonNode root = objectMapper.readTree(json);
        JsonNode shops = root.path("results").path("shop");

        for (JsonNode shop : shops) {
            String imageUrl = shop.path("photo").path("pc").path("l").asText("");
            List<String> images = new ArrayList<>();
            if (!imageUrl.isEmpty())
                images.add(imageUrl);

            RestaurantInfo info = RestaurantInfo.builder()
                    .id(shop.path("id").asText(""))
                    .name(shop.path("name").asText(""))
                    .genre_name(shop.path("genre").path("name").asText(""))
                    .nearest_station(shop.path("station_name").asText(""))
                    .imageUrl(imageUrl)
                    .images(images)
                    .address(shop.path("address").asText(""))
                    .open(shop.path("open").asText(""))
                    .close(shop.path("close").asText(""))
                    .budget(shop.path("budget").path("average").asText(""))
                    .tel(shop.path("tel").asText(""))
                    .url(shop.path("urls").path("pc").asText(""))
                    .build();

            result.add(info);
        }

        log.info("HotPepper API result: {} shops", result.size());
        return result;
    }
}
