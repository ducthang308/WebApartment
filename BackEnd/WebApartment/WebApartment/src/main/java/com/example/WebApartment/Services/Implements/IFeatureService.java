package com.example.WebApartment.Services.Implements;
import com.example.WebApartment.DTO.FeatureDTO;
import com.example.WebApartment.Exceptions.DataNotFoundException;
import com.example.WebApartment.Models.Feature;

import java.util.List;

public interface IFeatureService {
    Feature createFeature(FeatureDTO featureDTO) throws DataNotFoundException;
    List<FeatureDTO> getAllFeature();
    Feature updateFeature(Long id, FeatureDTO featureDTO) throws DataNotFoundException;
    void deleteFeature(Long id);

}
