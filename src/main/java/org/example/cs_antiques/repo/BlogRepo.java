package org.example.cs_antiques.repo;

import org.example.cs_antiques.entity.Blog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BlogRepo extends JpaRepository<Blog,String> {
}
