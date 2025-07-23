package com.example.WebApartment.Models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.Date;

@Entity
@Table(name = "favorite_listings")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
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

