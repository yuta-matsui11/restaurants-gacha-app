package com.example.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class StationDto {

    private double lat;
    private double lng;
    private String station_name;

}
