package org.example.cs_antiques.repo;

import org.example.cs_antiques.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;


public interface UserRepository extends JpaRepository<User,String> {
    User findByEmail(String userName);

    boolean existsByEmail(String userName);

//    User findByNameAndEmail(String name, String password);
}
