package com.example.WebApartment.Services.Implements;

import com.example.WebApartment.DTO.ProvinceDTO;
import com.example.WebApartment.Exceptions.DataNotFoundException;
import com.example.WebApartment.Models.Province;

import java.util.List;

public interface IProvinceService {
    Province createProvince(ProvinceDTO provinceDTO) throws DataNotFoundException;
    List<Province> getAllProvinces();
    Province updateProvince(Long id, ProvinceDTO provinceDTO) throws DataNotFoundException;
    void deleteProvince(Long id);
}
