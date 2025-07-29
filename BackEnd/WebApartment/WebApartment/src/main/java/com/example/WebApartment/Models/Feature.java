package com.example.WebApartment.Models;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "feature")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Feature {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "feature_name", nullable = false)
    private String featureName;

    @ManyToMany(mappedBy = "features")
    private List<Listing> listings;
}

