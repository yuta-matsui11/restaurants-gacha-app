package com.example.backend.dto;

//APIのリクエストやレスポンスで使用するDTOをまとめるクラス

public class Dtos {

    public static class UserRequest {
        public String user_name;
        public String email;
        public String password_hash;
    }

    public static class UserResponse {
        public Long user_id;
        public String user_name;
        public String email;
    }

    public static class LoginRequest {
        public String email;
        public String password_hash;
    }

    public static class GachaRequest {
        public String station_name;
        public String genre_id;
    }

    public static class GachaResponse {
        public String restaurant_id;
        public String restaurant_name;
        public String address;
    }

    public static class FavoriteRequest {
    public Long userId;
    public String restaurantId;
    public String stationName;
    public String genreName;
    public String restaurantName;
    public String imageUrl;
}

}
