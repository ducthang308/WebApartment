package com.example.WebApartment.Services.Implements;

import com.example.WebApartment.DTO.DistrictDTO;
import com.example.WebApartment.Exceptions.DataNotFoundException;
import com.example.WebApartment.Models.District;
import com.example.WebApartment.Models.Ward;

import java.util.List;

public interface IDistrictService {
    District createDistrict(DistrictDTO districtDTO) throws DataNotFoundException;
    List<District> getAllDistricts();
    District updateDistrict(Long id, DistrictDTO districtDTO) throws DataNotFoundException;
    void deleteDistrict(Long id);

}
