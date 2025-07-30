package com.example.WebApartment.Controllers;

import com.example.WebApartment.DTO.DistrictDTO;
import com.example.WebApartment.Exceptions.DataNotFoundException;
import com.example.WebApartment.Models.District;
import com.example.WebApartment.Services.DistrictService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("${api.prefix}/district")
@RequiredArgsConstructor
public class DistrictController {
    private final DistrictService districtService;

    @PostMapping("")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> createDistrict(@Valid @RequestBody DistrictDTO districtDTO, BindingResult result) throws DataNotFoundException {
        if(result.hasErrors()){
            List<String> errorMessage = result.getFieldErrors()
                    .stream()
                    .map(FieldError::getDefaultMessage)
                    .toList();
            return ResponseEntity.badRequest().body(errorMessage);
        }
        districtService.createDistrict(districtDTO);
        return ResponseEntity.ok("Create successfully");
    }

    @GetMapping("")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<District>> getAllProvinces(){
        List<District> getAll = districtService.getAllDistricts();
        return ResponseEntity.ok(getAll);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> updateProvince(@PathVariable Long id,
                                            @Valid @RequestBody DistrictDTO districtDTO) throws DataNotFoundException {
        districtService.updateDistrict(id, districtDTO);
        return ResponseEntity.ok("Update successfully");
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteProvince(@PathVariable Long id){
        districtService.deleteDistrict(id);
        return ResponseEntity.ok("Delete successfully");
    }
}
