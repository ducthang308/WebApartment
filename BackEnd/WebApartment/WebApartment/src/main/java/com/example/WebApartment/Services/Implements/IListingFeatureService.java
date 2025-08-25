package com.example.WebApartment.Services.Implements;

import com.example.WebApartment.DTO.ListingFeatureDTO;
import com.example.WebApartment.Models.Listing;
import com.example.WebApartment.Models.ListingFeature;
import com.example.WebApartment.Models.ListingFeatureId;

import java.util.List;

public interface IListingFeatureService {
    ListingFeatureDTO createListingFeature(ListingFeatureDTO dto);
    ListingFeatureDTO getListingFeatureById(ListingFeatureId id);
    List<ListingFeatureDTO> getAllListingFeatures();
    ListingFeatureDTO updateListingFeature(ListingFeatureId id, ListingFeatureDTO dto);
    void deleteListingFeature(ListingFeatureId id);
}
