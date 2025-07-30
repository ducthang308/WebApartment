package com.example.WebApartment.Services;

import com.example.WebApartment.DTO.DistrictDTO;
import com.example.WebApartment.Exceptions.DataNotFoundException;
import com.example.WebApartment.Models.District;
import com.example.WebApartment.Models.Province;
import com.example.WebApartment.Repositories.DistrictRepository;
import com.example.WebApartment.Repositories.ProvinceRepository;
import com.example.WebApartment.Services.Implements.IDistrictService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DistrictService implements IDistrictService {
    private final DistrictRepository districtRepository;
    private final ProvinceRepository provinceRepository;

    @Override
    public District createDistrict(DistrictDTO districtDTO) throws DataNotFoundException {
        Province existingProvince = provinceRepository.findById(districtDTO.getProvinceId())
                .orElseThrow(()->new DataNotFoundException("Id not found"));
        District create = District.builder()
                .districtName(districtDTO.getDistrictName())
                .province(existingProvince)
                .build();
        return districtRepository.save(create);
    }

    @Override
    public List<District> getAllDistricts() {
        return districtRepository.findAll();
    }

    @Override
    public District updateDistrict(Long id, DistrictDTO districtDTO) throws DataNotFoundException {
        District existingDistrict = districtRepository.findById(id)
                .orElseThrow(()->new DataNotFoundException("Id not found"));
        if(existingDistrict != null){
            Province existingProvince = provinceRepository.findById(districtDTO.getProvinceId())
                    .orElseThrow(()->new DataNotFoundException("Id not found"));
            existingDistrict.setDistrictName(districtDTO.getDistrictName());
            existingDistrict.setProvince(existingProvince);
            return districtRepository.save(existingDistrict);
        }
        return null;
    }

    @Override
    public void deleteDistrict(Long id) {
        districtRepository.deleteById(id);
    }
}
