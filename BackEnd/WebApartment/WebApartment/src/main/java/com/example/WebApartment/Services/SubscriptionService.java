package com.example.WebApartment.Services;

import com.example.WebApartment.DTO.SubscriptionDTO;
import com.example.WebApartment.DTO.SubscriptionResponseDTO;
import com.example.WebApartment.Exceptions.DataNotFoundException;
import com.example.WebApartment.Models.PaymentMethod;
import com.example.WebApartment.Models.Subscription;
import com.example.WebApartment.Models.User;
import com.example.WebApartment.Repositories.PaymentMethodRepository;
import com.example.WebApartment.Repositories.SubscriptionRepository;
import com.example.WebApartment.Repositories.UserRepository;
import com.example.WebApartment.Services.Implements.ISubscriptionService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SubscriptionService implements ISubscriptionService {
    private final SubscriptionRepository subscriptionRepository;
    private final UserRepository userRepository;
    private final PaymentMethodRepository paymentMethodRepository;
    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

    @Override
    public Subscription createSubscription(SubscriptionDTO dto) throws DataNotFoundException, ParseException {
        User user = userRepository.findById(dto.getUsersId())
                .orElseThrow(() -> new DataNotFoundException("User not found with id: " + dto.getUsersId()));
        PaymentMethod payment = paymentMethodRepository.findById(dto.getPaymentId())
                .orElseThrow(() -> new DataNotFoundException("Payment method not found with id: " + dto.getPaymentId()));

        Subscription subscription = Subscription.builder()
                .user(user)
                .paymentMethod(payment)
                .startDate(sdf.parse(dto.getStartDate()))
                .endDate(sdf.parse(dto.getEndDate()))
                .amount(dto.getAmount())
                .status(dto.getStatus())
                .createdAt(sdf.parse(dto.getCreatedAt()))
                .build();

        return subscriptionRepository.save(subscription);
    }

    @Override
    public List<SubscriptionResponseDTO> getAllSubscriptions() {
        return subscriptionRepository.findAll()
                .stream()
                .map(s -> SubscriptionResponseDTO.builder()
                        .id(s.getId())
                        .usersId(s.getUser().getId())
                        .paymentId(s.getPaymentMethod().getId())
                        .paymentName(s.getPaymentMethod().getNameMethod())
                        .amount(s.getAmount())
                        .status(s.getStatus())
                        .startDate(s.getStartDate().toString())
                        .endDate(s.getEndDate().toString())
                        .createdAt(s.getCreatedAt().toString())
                        .build())
                .toList();
    }

    @Override
    public List<SubscriptionResponseDTO> getSubscriptionsById(Long userId){
        return subscriptionRepository.findByUserId(userId)
                .stream()
                .map( subscription -> SubscriptionResponseDTO.builder()
                        .id(subscription.getId())
                        .usersId(subscription.getUser().getId())
                        .paymentName(subscription.getPaymentMethod().getNameMethod())
                        .paymentId(subscription.getPaymentMethod().getId())
                        .startDate(sdf.format(subscription.getStartDate()))
                        .endDate(sdf.format(subscription.getEndDate()))
                        .amount(subscription.getAmount())
                        .status(subscription.getStatus())
                        .createdAt(sdf.format(subscription.getCreatedAt()))
                        .build()
                ).toList();
    }
    @Override
    public Subscription updateSubscription(Long id, SubscriptionDTO dto) throws DataNotFoundException, ParseException {
        Subscription subscription = subscriptionRepository.findById(id)
                .orElseThrow(() -> new DataNotFoundException("Subscription not found with id: " + id));
        User user = userRepository.findById(dto.getUsersId())
                .orElseThrow(() -> new DataNotFoundException("User not found with id: " + dto.getUsersId()));
        PaymentMethod payment = paymentMethodRepository.findById(dto.getPaymentId())
                .orElseThrow(() -> new DataNotFoundException("Payment method not found with id: " + dto.getPaymentId()));

        subscription.setUser(user);
        subscription.setPaymentMethod(payment);
        subscription.setStartDate(sdf.parse(dto.getStartDate()));
        subscription.setEndDate(sdf.parse(dto.getEndDate()));
        subscription.setAmount(dto.getAmount());
        subscription.setStatus(dto.getStatus());
        subscription.setCreatedAt(sdf.parse(dto.getCreatedAt()));

        return subscriptionRepository.save(subscription);
    }

    @Override
    public void deleteSubscription(Long id) {
        if (!subscriptionRepository.existsById(id)) {
            throw new EntityNotFoundException("Subscription not found with id: " + id);
        }
        subscriptionRepository.deleteById(id);
    }

//    @Override
//    public List<Subscription> getSubscriptionsByUser(Long userId) {
//        return subscriptionRepository.findByUserId(userId);
//    }
//
//    @Override
//    public List<Subscription> getSubscriptionsByStatus(String status) {
//        return subscriptionRepository.findByStatus(status);
//    }
}
