package org.example.cs_antiques.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "Orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String orderId;
    private String cusId;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private String address;
    private String city;
    private String zipCode;
    private String country;
    private String saveAddress;
    private String totalPrice;
    private String payMethod;
    private String cardNumber;
    private String expDate;
    private String cvv;
    private String cardName;
}
