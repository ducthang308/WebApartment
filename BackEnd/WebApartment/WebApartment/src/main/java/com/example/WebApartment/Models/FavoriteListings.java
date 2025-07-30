package com.example.WebApartment.Models;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.List;

@Entity
@Table(name = "favorite_listings")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FavoriteListings {
    @EmbeddedId
    private FavoriteListingsKey id;

    @ManyToOne
    @MapsId("usersId")
    @JoinColumn(name = "users_id")
    private User user;

    @ManyToOne
    @MapsId("listingId")
    @JoinColumn(name = "listing_id")
    private Listing listing;

    @Column(name = "created_at")
    private Date createdAt;
}

