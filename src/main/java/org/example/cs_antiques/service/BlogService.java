package org.example.cs_antiques.service;

import org.example.cs_antiques.dto.BlogDTO;

import java.util.List;

public interface BlogService {
    int savePost(BlogDTO blogDTO);

    List<BlogDTO> getAll();
}
