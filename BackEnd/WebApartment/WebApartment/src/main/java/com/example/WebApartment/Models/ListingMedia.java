package com.example.WebApartment.Models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "listing_media")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ListingMedia {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "listing_id")
    private Listing listing;

    @Column(name = "type")
    private String type;

    @Column(name = "url")
    private String url;

    @Column(name = "thumbnail_url")
    private String thumbnailUrl;

    @Column(name = "order_index")
    private Integer orderIndex;
}

