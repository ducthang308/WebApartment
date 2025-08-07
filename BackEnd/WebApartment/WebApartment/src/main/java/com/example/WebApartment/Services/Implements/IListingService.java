package com.example.WebApartment.Services.Implements;

import com.example.WebApartment.DTO.ListingDTO;
import com.example.WebApartment.DTO.ListingMediaDTO;
import com.example.WebApartment.Models.Listing;
import com.example.WebApartment.Models.ListingMedia;

import java.util.List;

public interface IListingService {
    Listing createListing(ListingDTO listingDTO) throws Exception;
    Listing getListingById(Long listingId) throws Exception;
    List<ListingDTO> getAllListings(String keyword, Long categoryId);
    Listing updateListing(Long listingId, ListingDTO listingDTO) throws Exception;
    void deleteListing(Long id);
    ListingMedia createListingMedia(Long listingId, ListingMediaDTO listingMediaDTO) throws Exception;
    List<Listing> findListingsByIds(List<Long> listingIds);
    int countImagesByListingId(Long listingId);
}
