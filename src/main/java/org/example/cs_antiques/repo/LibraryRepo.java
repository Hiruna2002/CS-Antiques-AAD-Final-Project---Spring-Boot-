package org.example.cs_antiques.repo;

import org.example.cs_antiques.entity.Library;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LibraryRepo extends JpaRepository<Library, String> {
}
