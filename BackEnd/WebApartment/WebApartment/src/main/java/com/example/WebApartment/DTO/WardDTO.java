package com.example.WebApartment.DTO;

import com.fasterxml.jackson.annotation.*;
import lombok.*;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WardDTO {
    @JsonProperty("ward_name")
    private String wardName;

    @JsonProperty("district_id")
    private Long districtId;
}

