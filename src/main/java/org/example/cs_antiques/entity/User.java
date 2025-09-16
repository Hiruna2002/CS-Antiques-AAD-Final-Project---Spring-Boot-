package org.example.cs_antiques.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "user")
public class User implements Serializable {
    @Id
    private String id;
    @Column(name = "name")
    private String name;
    private String address;
    private String number;
    @Column(unique = true)
    private String email;
    private String password;
    private String role;
}
