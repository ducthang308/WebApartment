package com.example.WebApartment.Services;

import com.example.WebApartment.DTO.FeatureDTO;
import com.example.WebApartment.Exceptions.DataNotFoundException;
import com.example.WebApartment.Models.Feature;
import com.example.WebApartment.Services.Implements.IFeatureService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import com.example.WebApartment.Repositories.FeatureRepository;
import org.springframework.stereotype.Service;

import java.awt.*;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FeatureService  implements IFeatureService {
    private final FeatureRepository featureRepository;

    @Override
    public Feature createFeature(FeatureDTO featureDTO)  throws DataNotFoundException {
        Feature feature =  Feature.builder()
                .featureName(featureDTO.getFeatureName())
                .build();
        return featureRepository.save(feature);
    }

    @Override
    public List<Feature> getAllFeature(){
        return featureRepository.findAll();
    }

    @Override
    public Feature updateFeature(Long id, FeatureDTO featureDTO)  throws DataNotFoundException {
        Feature feature = featureRepository.findById(id)
                .orElseThrow(() -> new DataNotFoundException("Feature not found with id: " + id));
        feature.setFeatureName(featureDTO.getFeatureName());
        return featureRepository.save(feature);
    }

    @Override
    public void deleteFeature(Long id){
        if(!featureRepository.existsById(id)){
            throw new EntityNotFoundException("Feature not found with id: " + id);
        }
        featureRepository.deleteById(id);
    }
}
