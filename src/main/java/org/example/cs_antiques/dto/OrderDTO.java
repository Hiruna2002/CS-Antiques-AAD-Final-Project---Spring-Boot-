package org.example.cs_antiques.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderDTO {
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
