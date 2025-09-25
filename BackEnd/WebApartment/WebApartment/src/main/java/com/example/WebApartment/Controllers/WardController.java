package com.example.WebApartment.Controllers;

import com.example.WebApartment.DTO.WardDTO;
import com.example.WebApartment.Exceptions.DataNotFoundException;
import com.example.WebApartment.Models.Ward;
import com.example.WebApartment.Services.WardService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("${api.prefix}/ward")
@RequiredArgsConstructor
public class WardController {
    private final WardService wardService;

    @PostMapping("")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> createDistrict(@Valid @RequestBody WardDTO WardDTO, BindingResult result) throws DataNotFoundException {
        if(result.hasErrors()){
            List<String> errorMessage = result.getFieldErrors()
                    .stream()
                    .map(FieldError::getDefaultMessage)
                    .toList();
            return ResponseEntity.badRequest().body(errorMessage);
        }
        wardService.createWard(WardDTO);
        return ResponseEntity.ok("Create successfully");
    }

    @GetMapping("")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Ward>> getAllProvinces(){
        List<Ward> getAll = wardService.getAllWards();
        return ResponseEntity.ok(getAll);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> updateProvince(@PathVariable Long id,
                                            @Valid @RequestBody WardDTO WardDTO) throws DataNotFoundException {
        wardService.updateWard(id, WardDTO);
        return ResponseEntity.ok("Update successfully");
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteProvince(@PathVariable Long id){
        wardService.deleteWard(id);
        return ResponseEntity.ok("Delete successfully");
    }

    @GetMapping("/{districtId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Ward>> getWardsByDistrict(@PathVariable Long districtId) {
        List<Ward> wards = wardService.getWardsByDistrict(districtId);
        return ResponseEntity.ok(wards);
    }
}
