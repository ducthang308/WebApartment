package com.example.WebApartment.Services;

import com.example.WebApartment.DTO.ProvinceDTO;
import com.example.WebApartment.Exceptions.DataNotFoundException;
import com.example.WebApartment.Models.Province;
import com.example.WebApartment.Repositories.ProvinceRepository;
import com.example.WebApartment.Services.Implements.IProvinceService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProvinceService implements IProvinceService {

    private final ProvinceRepository provinceRepository;

    @Override
    public Province createProvince(ProvinceDTO provinceDTO) throws DataNotFoundException {
        Province create = Province.builder().provinceName(provinceDTO.getProvinceName())
                .build();
        return provinceRepository.save(create);
    }

    @Override
    public List<Province> getAllProvinces() {
        return provinceRepository.findAll();
    }

    @Override
    public Province updateProvince(Long id, ProvinceDTO provinceDTO) throws DataNotFoundException {
        Province existingProvince = provinceRepository.findById(id)
                .orElseThrow(()->new DataNotFoundException("Id not found"));
        existingProvince.setProvinceName(provinceDTO.getProvinceName());
        provinceRepository.save(existingProvince);
        return existingProvince;
    }

    @Override
    public void deleteProvince(Long id) {
        provinceRepository.deleteById(id);
    }
}
