package com.example.WebApartment.Models;

import jakarta.persistence.Embeddable;
import lombok.*;

import java.io.Serializable;

@Embeddable
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FavoriteListingsKey implements Serializable {
    private Long usersId;
    private Long listingId;
}