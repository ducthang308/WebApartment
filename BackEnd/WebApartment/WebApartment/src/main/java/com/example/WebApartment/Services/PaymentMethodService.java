package com.example.WebApartment.Services;

import com.example.WebApartment.DTO.PaymentMethodDTO;
import com.example.WebApartment.Exceptions.DataNotFoundException;
import com.example.WebApartment.Models.PaymentMethod;
import com.example.WebApartment.Repositories.PaymentMethodRepository;
import com.example.WebApartment.Services.Implements.IPaymentMethodService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PaymentMethodService implements IPaymentMethodService {
    private final PaymentMethodRepository paymentMethodRepository;

    @Override
    public PaymentMethod createPaymentMethod(PaymentMethodDTO dto) {
        PaymentMethod paymentMethod = PaymentMethod.builder()
                .nameMethod(dto.getNameMethod())
                .paymentDescription(dto.getPaymentDescription())
                .build();
        return paymentMethodRepository.save(paymentMethod);
    }

    @Override
    public List<PaymentMethod> getAllPaymentMethods(){
        return paymentMethodRepository.findAll();
    }

    @Override
    public PaymentMethod updatePaymentMethod(Long id, PaymentMethodDTO dto) throws DataNotFoundException{
        PaymentMethod paymentMethod = paymentMethodRepository.findById(id)
                .orElseThrow(() -> new DataNotFoundException("Payment method not found with id: "+id));
        paymentMethod.setNameMethod(dto.getNameMethod());
        paymentMethod.setPaymentDescription(dto.getPaymentDescription());
        return paymentMethodRepository.save(paymentMethod);
    }

    @Override
    public void deletePaymentMethod(Long id){
        if(!paymentMethodRepository.existsById(id)){
            throw new EntityNotFoundException("Payment method not found with id: "+id);
        }
        paymentMethodRepository.deleteById(id);
    }
}
