package com.example.WebApartment.DTO;

import com.fasterxml.jackson.annotation.JsonProperty;

public class StreetDTO {
    @JsonProperty("id")
    private Long id;

    @JsonProperty("ward_id")
    private Long wardID;

    @JsonProperty("street_name")
    private String streetName;
}
