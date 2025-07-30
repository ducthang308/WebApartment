package com.example.WebApartment.Repositories;

import com.example.WebApartment.Models.Province;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface  ProvinceRepository extends JpaRepository<Province,Long> {

}
