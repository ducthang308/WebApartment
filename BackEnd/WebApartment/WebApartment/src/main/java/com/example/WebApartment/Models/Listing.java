package com.example.WebApartment.Models;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.List;

@Entity
@Table(name = "listing")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Listing {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "users_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    @Column(name = "full_address")
    private String fullAddress;

    @Column(name = "price")
    private Double price;

    @Column(name = "area_m2")
    private Double areaM2;

    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;

    @Column(name = "posted_date")
    private Date postedDate;

    @Column(name = "status")
    private String status;

    @Column(name = "contact")
    private String contact;

    @Column(name = "form_of_payment")
    private String formOfPayment;

    @OneToMany(mappedBy = "listing")
    private List<ListingMedia> mediaList;

    @ManyToMany
    @JoinTable(
            name = "listing_feature",
            joinColumns = @JoinColumn(name = "listing_id"),
            inverseJoinColumns = @JoinColumn(name = "feature_id")
    )
    private List<Feature> features;

    @OneToMany(mappedBy = "listing")
    private List<FavoriteListings> favoritedByUsers;

}

