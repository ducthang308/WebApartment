package com.example.WebApartment.Models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "street")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class Street {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "ward_id")
    private Ward ward;

    @Column(name = "street_name", nullable = false)
    private String streetName;


}
