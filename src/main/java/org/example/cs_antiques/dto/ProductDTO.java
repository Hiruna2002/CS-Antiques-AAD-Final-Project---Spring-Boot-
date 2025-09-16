package org.example.cs_antiques.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductDTO {
    String id;
    String productName;
    Double productPrice;
    String category;
    String image;
    String description;
    Double width;
    Double height;
    Double length;
    String timeLine;
    int stock;
}
