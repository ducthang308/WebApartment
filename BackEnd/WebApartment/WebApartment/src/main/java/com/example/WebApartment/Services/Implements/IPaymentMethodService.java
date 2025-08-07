package com.example.WebApartment.Services.Implements;

import com.example.WebApartment.DTO.PaymentMethodDTO;
import com.example.WebApartment.Exceptions.DataNotFoundException;
import com.example.WebApartment.Models.PaymentMethod;

import java.util.List;

public interface IPaymentMethodService {
    PaymentMethod createPaymentMethod(PaymentMethodDTO dto);
    List<PaymentMethod> getAllPaymentMethods();
    PaymentMethod updatePaymentMethod(Long id, PaymentMethodDTO dto) throws DataNotFoundException;
    void deletePaymentMethod(Long id);
}

