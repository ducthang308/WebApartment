package com.example.WebApartment.Services.Implements;

import com.example.WebApartment.DTO.CategoryDTO;
import com.example.WebApartment.Exceptions.DataNotFoundException;
import com.example.WebApartment.Models.Category;

import java.util.List;

public interface ICategoryService {
    Category createCategory(CategoryDTO categoryDTO) throws DataNotFoundException;
    List<Category> getAllCategories();
    Category updateCategory(Long id, CategoryDTO categoryDTO) throws DataNotFoundException;
    void deleteCategory(Long id);
}
