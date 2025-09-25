package com.example.WebApartment.Models;


import jakarta.persistence.Column;
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
    @Column(name = "listing_id")
    private Long listingId;

    @Column(name = "feature_id")
    private Long featureId;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ListingFeatureId that = (ListingFeatureId) o;
        return Objects.equals(listingId, that.listingId) &&
                Objects.equals(featureId, that.featureId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(listingId, featureId);
    }
}

