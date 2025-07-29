package com.example.WebApartment.Models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "statistic")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Statistic {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "total_users")
    private Integer totalUsers;

    @Column(name = "total_listing")
    private Integer totalListing;

    @Column(name = "monthly_visits")
    private Integer monthlyVisits;
}

