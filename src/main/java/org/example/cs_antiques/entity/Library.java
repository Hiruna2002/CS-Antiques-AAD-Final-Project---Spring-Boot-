package org.example.cs_antiques.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Library {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    private String data;
    private String post;
}
