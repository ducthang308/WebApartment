package com.example.WebApartment.Models;

import com.example.WebApartment.Configurations.SecurityConfig;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "listing_feature")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ListingFeature {
    @EmbeddedId
    private ListingFeatureId id;

    @ManyToOne
    @MapsId("listingId")
    @JoinColumn(name = "listing_id")
    private Listing listing;

    @ManyToOne
    @MapsId("featureId")
    @JoinColumn(name = "feature_id")
    private Feature feature;
}
