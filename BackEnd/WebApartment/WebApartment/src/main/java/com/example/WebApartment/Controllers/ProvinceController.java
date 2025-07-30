package com.example.WebApartment.Controllers;

import com.example.WebApartment.DTO.ProvinceDTO;
import com.example.WebApartment.Exceptions.DataNotFoundException;
import com.example.WebApartment.Models.Province;
import com.example.WebApartment.Services.ProvinceService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("${api.prefix}/province")
@RequiredArgsConstructor
public class ProvinceController {

    private final ProvinceService provinceService;

    @PostMapping("")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> createProvince(@Valid @RequestBody ProvinceDTO provinceDTO, BindingResult result) throws DataNotFoundException {
        if(result.hasErrors()){
            List<String> errorMessage = result.getFieldErrors()
                    .stream()
                    .map(FieldError::getDefaultMessage)
                    .toList();
            return ResponseEntity.badRequest().body(errorMessage);
        }
        provinceService.createProvince(provinceDTO);
        return ResponseEntity.ok("Create successfully");
    }

    @GetMapping("")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Province>> getAllProvinces(){
        List<Province> getAll = provinceService.getAllProvinces();
        return ResponseEntity.ok(getAll);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> updateProvince(@PathVariable Long id,
                                            @Valid @RequestBody ProvinceDTO provinceDTO) throws DataNotFoundException {
        provinceService.updateProvince(id, provinceDTO);
        return ResponseEntity.ok("Update successfully");
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteProvince(@PathVariable Long id){
        provinceService.deleteProvince(id);
        return ResponseEntity.ok("Delete successfully");
    }
}
