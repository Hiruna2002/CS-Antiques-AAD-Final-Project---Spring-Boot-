package org.example.cs_antiques.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table (name = "Product")
public class Product implements Serializable {
    @Id
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
