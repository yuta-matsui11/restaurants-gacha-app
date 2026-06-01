package com.example.backend.external;

import java.util.List;

public interface RestaurantService {

    /**
     * 緯度経度・範囲・ジャンルで飲食店一覧を取得する
     */
    List<RestaurantInfo> search(double lat, double lng, String genre);

    /**
     * 店舗IDで詳細情報を取得する
     */
    RestaurantInfo getDetail(String restaurant_id);

}
