package com.example.WebApartment.Services;

import com.example.WebApartment.DTO.WardDTO;
import com.example.WebApartment.Exceptions.DataNotFoundException;
import com.example.WebApartment.Models.District;
import com.example.WebApartment.Models.Ward;
import com.example.WebApartment.Repositories.DistrictRepository;
import com.example.WebApartment.Repositories.WardRepository;
import com.example.WebApartment.Services.Implements.IWardService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class WardService implements IWardService {
    private final WardRepository wardRepository;
    private final DistrictRepository districtRepository;

    @Override
    public List<Ward> getWardsByDistrict(Long districtId) {
        return wardRepository.findByDistrictId(districtId);
    }

    @Override
    public Ward createWard(WardDTO wardDTO) throws DataNotFoundException {
        District existingDistrict = districtRepository.findById(wardDTO.getDistrictId())
                .orElseThrow(()->new DataNotFoundException("Id not found"));
        Ward create = Ward.builder()
                .wardName(wardDTO.getWardName())
                .district(existingDistrict)
                .build();
        return wardRepository.save(create);
    }

    @Override
    public List<Ward> getAllWards() {
        return wardRepository.findAll();
    }

    @Override
    public Ward updateWard(Long id, WardDTO wardDTO) throws DataNotFoundException {
        Ward existingWard = wardRepository.findById(id)
                .orElseThrow(()->new DataNotFoundException("Id not found"));
        if(existingWard != null){
            District existingDistrict = districtRepository.findById(wardDTO.getDistrictId())
                    .orElseThrow(()->new DataNotFoundException("Id not found"));
            existingWard.setWardName(wardDTO.getWardName());
            existingWard.setDistrict(existingDistrict);
            return wardRepository.save(existingWard);
        }
        return null;
    }

    @Override
    public void deleteWard(Long id) {
        wardRepository.deleteById(id);
    }

}
