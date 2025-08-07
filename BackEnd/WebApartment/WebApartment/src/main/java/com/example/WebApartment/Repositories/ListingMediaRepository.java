package com.example.WebApartment.Repositories;

import com.example.WebApartment.Models.ListingMedia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ListingMediaRepository extends JpaRepository<ListingMedia,Long> {
    List<ListingMedia> findByListingId(Long listingId);
    @Query("SELECT COUNT(lm) FROM ListingMedia lm WHERE lm.listing.id = :listingId")
    int countByListingId(@Param("listingId") Long listingId);
}
