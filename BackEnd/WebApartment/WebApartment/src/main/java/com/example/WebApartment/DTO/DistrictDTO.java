package com.example.WebApartment.DTO;

import com.fasterxml.jackson.annotation.*;
import lombok.*;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DistrictDTO {
    @JsonProperty("id")
    private Long id;

    @JsonProperty("district_name")
    private String districtName;

    @JsonProperty("province_id")
    private Long provinceId;
}

