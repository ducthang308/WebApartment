package com.example.WebApartment.Repositories;

import com.example.WebApartment.Models.ListingFeature;
import com.example.WebApartment.Models.ListingFeatureId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ListingFeatureRepository extends JpaRepository<ListingFeature, ListingFeatureId> {
}
