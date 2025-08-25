package com.example.WebApartment.DTO;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@Builder
public class ListingFeatureDTO {
    private Long listingId;
    private Long featureId;

    public ListingFeatureDTO(Long listingId, Long featureId) {
        this.listingId = listingId;
        this.featureId = featureId;
    }
}
