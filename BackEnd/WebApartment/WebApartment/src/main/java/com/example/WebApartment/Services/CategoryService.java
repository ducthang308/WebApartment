package com.example.WebApartment.Services;

import com.example.WebApartment.DTO.CategoryDTO;
import com.example.WebApartment.Exceptions.DataNotFoundException;
import com.example.WebApartment.Models.Category;
import com.example.WebApartment.Repositories.CategoryRepository;
import com.example.WebApartment.Services.Implements.ICategoryService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

import static org.springframework.data.jpa.domain.AbstractPersistable_.id;

@Service
@RequiredArgsConstructor
public class CategoryService implements ICategoryService {
    private final CategoryRepository categoryRepository;

    @Override
    public Category createCategory(CategoryDTO categoryDTO)  throws DataNotFoundException {
        Category category =  Category.builder()
                .categoryName(categoryDTO.getCategoryName())
                .build();
        return categoryRepository.save(category);
    }

    @Override
    public List<CategoryDTO> getAllCategories() {
        return categoryRepository.findAll()
                .stream()
                .map(cat -> new CategoryDTO(cat.getId(), cat.getCategoryName()))
                .toList();
    }
    @Override
    public Category updateCategory(Long id, CategoryDTO categoryDTO)  throws DataNotFoundException {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new DataNotFoundException("Category not found with id: " + id));
        category.setCategoryName(categoryDTO.getCategoryName());
        return categoryRepository.save(category);
    }

    @Override
    public void deleteCategory(Long id){
        if(!categoryRepository.existsById(id)){
            throw new EntityNotFoundException("Category not found with id: " + id);
        }
        categoryRepository.deleteById(id);
    }
}
