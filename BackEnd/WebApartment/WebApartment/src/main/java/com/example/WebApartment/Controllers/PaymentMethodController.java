package com.example.WebApartment.Controllers;

import com.example.WebApartment.DTO.PaymentMethodDTO;
import com.example.WebApartment.Exceptions.DataNotFoundException;
import com.example.WebApartment.Models.PaymentMethod;
import com.example.WebApartment.Services.PaymentMethodService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Repository;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("${api.prefix}/paymentMethod")
public class PaymentMethodController {
    private final   PaymentMethodService paymentMethodService;

    @PostMapping("")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> createPaymentMethod(@Valid @RequestBody PaymentMethodDTO dto, BindingResult result){
        if(result.hasErrors()){
            List<String> errorMessage = result.getFieldErrors()
                    .stream()
                    .map(FieldError::getDefaultMessage)
                    .toList();
            return ResponseEntity.badRequest().body(errorMessage);
        }
        paymentMethodService.createPaymentMethod(dto);
        return ResponseEntity.ok("Create successfully");
    }

    @GetMapping("")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<PaymentMethod>> getAllPaymentMethods(){
        return ResponseEntity.ok(paymentMethodService.getAllPaymentMethods());
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
        public ResponseEntity<?> updatePaymentMethod(@PathVariable Long id, @Valid @RequestBody PaymentMethodDTO dto) throws DataNotFoundException{
        paymentMethodService.updatePaymentMethod(id, dto);
        return ResponseEntity.ok("Update successfully");
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?>  deletePaymentMethod(@PathVariable Long id){
        paymentMethodService.deletePaymentMethod(id);
        return ResponseEntity.ok("Delete successfully");
    }


}
