package com.example.WebApartment.Controllers;

import com.example.WebApartment.DTO.FeatureDTO;
import com.example.WebApartment.Exceptions.DataNotFoundException;
import com.example.WebApartment.Models.Feature;
import com.example.WebApartment.Models.Province;
import com.example.WebApartment.Services.FeatureService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("${api.prefix}/feature")
@RequiredArgsConstructor
public class FeatureController {
    private final FeatureService featureService;

    @PostMapping("")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> createFeature(@Valid @RequestBody FeatureDTO featureDTO, BindingResult result) throws DataNotFoundException {
        if(result.hasErrors()){
            List<String> errorMessage =  result.getFieldErrors()
                    .stream()
                    .map(FieldError::getDefaultMessage)
                    .toList();
        return ResponseEntity.badRequest().body(errorMessage);
        }
        featureService.createFeature(featureDTO);
        return ResponseEntity.ok("Create successfully");
    }

    @GetMapping("")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<FeatureDTO>> getAllFeatures(){
        return ResponseEntity.ok(featureService.getAllFeature());
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> updateFeature(@PathVariable Long id, @Valid @RequestBody FeatureDTO featureDTO) throws DataNotFoundException {
        featureService.updateFeature(id, featureDTO);
        return ResponseEntity.ok("Update successfully");
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteFeature(@PathVariable Long id) {
        featureService.deleteFeature(id);
        return ResponseEntity.ok("Delete successfully");
    }
}
