package com.example.WebApartment.DTO;

import com.fasterxml.jackson.annotation.*;
import lombok.*;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FeatureDTO {
    @JsonProperty("id")
    private Long id;

    @JsonProperty("feature_name")
    private String featureName;
}

