package org.example.cs_antiques.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CartDTO {
    private String productId;
    private String image;
    private String cusId;
    private String productName;
    private String category;
    private String description;
    private String price;
    private String stock;
    private int qty;

}
