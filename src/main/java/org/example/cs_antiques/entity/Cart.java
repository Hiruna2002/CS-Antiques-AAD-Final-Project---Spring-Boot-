package org.example.cs_antiques.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "cart")
public class Cart {
    @Id
    @Column(name = "cart_id", nullable = false, updatable = false)
    private String cartId;
    private String cusId;
    private String productId;
    private String image;
    private String productName;
    private String category;
    private String description;
    private String price;
    private String stock;
    private String qty;

    @PrePersist
    public void generateId() {
        if (this.cartId == null) {
            this.cartId = UUID.randomUUID().toString();
        }
    }
}
