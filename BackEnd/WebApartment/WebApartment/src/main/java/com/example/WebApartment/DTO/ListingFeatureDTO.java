package com.example.WebApartment.DTO;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ListingFeatureDTO {
    @JsonProperty("listing_id")
    private Long listingId;
    @JsonProperty("feature_id")
    private Long featureId;

}