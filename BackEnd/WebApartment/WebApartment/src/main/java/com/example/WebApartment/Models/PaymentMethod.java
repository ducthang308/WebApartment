package com.example.WebApartment.Models;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "payment_method")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PaymentMethod {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name_method")
    private String nameMethod;

    @Column(name = "payment_description")
    private String paymentDescription;

    @OneToMany(mappedBy = "paymentMethod")
    private List<Subscription> subscriptions;
}

