package com.example.backend.external;
//外部APIから取得したレストランの情報を格納するクラス

import lombok.Builder;
import lombok.Getter;
import java.util.List;

@Getter
@Builder

public class RestaurantInfo {

    private String id;
    private String name;
    private String genre_name;
    private String nearest_station;
    private String imageUrl;
    private List<String> images;
    private String address;
    private String open;
    private String close;
    private String budget;
    private String tel;
    private String url;

}
