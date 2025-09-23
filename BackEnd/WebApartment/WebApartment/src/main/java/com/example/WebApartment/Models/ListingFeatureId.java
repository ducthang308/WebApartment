package com.example.WebApartment.Models;


import jakarta.persistence.Embeddable;
import lombok.*;

import java.io.Serializable;
import java.util.Objects;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Embeddable
public class ListingFeatureId implements Serializable {
    private Long listingId;
    private Long featureId;
}
