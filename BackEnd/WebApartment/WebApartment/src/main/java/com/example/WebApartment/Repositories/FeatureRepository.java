package com.example.WebApartment.Repositories;

import com.example.WebApartment.Models.Feature;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


public interface FeatureRepository extends JpaRepository<Feature, Long> {

}
