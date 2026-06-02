package com.example.backend.external;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

@Slf4j
@Service
public class HearRailsStationService {
    private static final String BASE_URL = "https://express.heartrails.com/api/json";

    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper = new ObjectMapper();

    public double[] getCoordinates(String stationName) {
        String url = UriComponentsBuilder.fromHttpUrl(BASE_URL)
                .queryParam("method", "getStations")
                .queryParam("name", stationName)
                .build()
                .toUriString();

        log.info("HeartRails API call: stationName={}", stationName);

        try {
            String response = restTemplate.getForObject(url, String.class);
            JsonNode root = objectMapper.readTree(response);
            JsonNode stations = root.path("response").path("station");

            if (stations.isEmpty()) {
                throw new StationNotFoundException("駅が見つかりません: " + stationName);
            }

            JsonNode first = stations.get(0);
            double lng = first.path("x").asDouble();
            double lat = first.path("y").asDouble();

            log.info("Station found: {} → lat={}, lng={}", stationName, lat, lng);
            return new double[] { lat, lng };

        } catch (StationNotFoundException e) {
            throw e;
        } catch (Exception e) {
            log.error("HeartRails API error", e);
            throw new RuntimeException("駅情報の取得に失敗しました: " + e.getMessage());
        }
    }

    public static class StationNotFoundException extends RuntimeException {
        public StationNotFoundException(String message) {
            super(message);
        }
    }
}
