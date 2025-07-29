package com.example.WebApartment.Models;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "ward")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Ward {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "ward_name", nullable = false)
    private String wardName;

    @ManyToOne
    @JoinColumn(name = "district_id")
    private District district;
    
}

