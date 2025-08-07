package com.example.WebApartment.Services;

import com.example.WebApartment.DTO.RoleDTO;
import com.example.WebApartment.Exceptions.DataNotFoundException;
import com.example.WebApartment.Models.Role;
import com.example.WebApartment.Repositories.RoleRepository;
import jakarta.persistence.EntityNotFoundException;
import com.example.WebApartment.Services.Implements.IRoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
class RoleService implements IRoleService {
    private final RoleRepository roleRepository;

    @Override
    public Role createRole(RoleDTO roleDTO) {
        Role role = Role.builder()
                .name(roleDTO.getRoleName())
                .build();
        return roleRepository.save(role);
    }

    @Override
    public List<Role> getAllRoles() {
        return roleRepository.findAll();
    }

    @Override
    public Role updateRole(Long id, RoleDTO roleDTO) throws DataNotFoundException {
        Role role = roleRepository.findById(id)
                .orElseThrow(() -> new DataNotFoundException("Role not found with id: " + id));
        role.setName(roleDTO.getRoleName());
        return roleRepository.save(role);
    }

    @Override
    public void deleteRole(Long id) {
        if (!roleRepository.existsById(id)) {
            throw new EntityNotFoundException("Role not found with id: " + id);
        }
        roleRepository.deleteById(id);
    }
}
