package com.example.WebApartment.Repositories;

import com.example.WebApartment.Models.Listing;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface ListingRepository extends JpaRepository<Listing,Long> {
    Page<Listing> findAll(Pageable pageable);

    @Query("SELECT DISTINCT l FROM Listing l " +
            "LEFT JOIN FETCH l.mediaList " +
            "WHERE (:categoryId IS NULL OR :categoryId = 0 OR l.category.id = :categoryId) " +
            "AND (:keyword IS NULL OR :keyword = '' OR l.title LIKE %:keyword%)")
    List<Listing> searchListing(@Param("categoryId") Long categoryId,
                                 @Param("keyword") String keyword);

    @Query("Select l FROM Listing l LEFT JOIN FETCH l.mediaList Where l.id = :listingId")
    Optional<Listing> getDetailListing(@Param("listingId") Long listingId);


    @Query("Select l FROM Listing l Where l.id IN :listingIds")
    List<Listing> findListingsByIds(@Param("listingIds") List<Long> listingIds);
}
