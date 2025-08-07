package com.example.WebApartment.Services.Implements;

import com.example.WebApartment.DTO.SubscriptionDTO;
import com.example.WebApartment.DTO.SubscriptionResponseDTO;
import com.example.WebApartment.Exceptions.DataNotFoundException;
import com.example.WebApartment.Models.Subscription;
import com.example.WebApartment.Repositories.SubscriptionRepository;

import java.text.ParseException;
import java.util.List;

public interface ISubscriptionService {
    Subscription createSubscription(SubscriptionDTO dto) throws DataNotFoundException, ParseException;
    List<SubscriptionResponseDTO> getAllSubscriptions();
    Subscription updateSubscription(Long id, SubscriptionDTO dto) throws DataNotFoundException, ParseException;
    void deleteSubscription(Long id);

//    //lấy theo userId
//    List<Subscription> getSubscriptionsByUser(Long userId);
//
//    //lấy theo status
//    List<Subscription> getSubscriptionsByStatus(String status);
}
