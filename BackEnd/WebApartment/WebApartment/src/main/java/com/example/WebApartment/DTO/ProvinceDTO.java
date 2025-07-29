package com.example.WebApartment.DTO;

import com.fasterxml.jackson.annotation.*;
import lombok.*;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProvinceDTO {
    @JsonProperty("province_name")
    private String provinceName;
}
