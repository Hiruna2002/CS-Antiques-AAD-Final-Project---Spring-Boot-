package org.example.cs_antiques.service.impl;

import org.example.cs_antiques.dto.BlogDTO;
import org.example.cs_antiques.dto.OrderDTO;
import org.example.cs_antiques.entity.Blog;
import org.example.cs_antiques.entity.User;
import org.example.cs_antiques.repo.BlogRepo;
import org.example.cs_antiques.service.BlogService;
import org.example.cs_antiques.util.VarList;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BlogServiceImpl implements BlogService {

    @Autowired
    private BlogRepo blogRepo;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public int savePost(BlogDTO blogDTO) {
        blogRepo.save(modelMapper.map(blogDTO, Blog.class));
        return VarList.Created;
    }

    @Override
    public List<BlogDTO> getAll() {
        return blogRepo.findAll()
                .stream()
                .map(blog -> modelMapper.map(blog, BlogDTO.class))
                .collect(Collectors.toList());
    }
}
