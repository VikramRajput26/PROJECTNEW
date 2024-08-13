package com.app.services;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.dto.ChildDTO;
import com.app.entity.Child;
import com.app.entity.User;
import com.app.repository.ChildRepository;
import com.app.repository.UserRepository;

@Service
@Transactional
public class ChildServiceImpl implements ChildService {

    @Autowired
    private final ChildRepository childRepository;

    @Autowired
    private final UserRepository userRepository;

    @Autowired
    private final ModelMapper modelMapper;

    public ChildServiceImpl(ChildRepository childRepository, UserRepository userRepository, ModelMapper modelMapper) {
        this.childRepository = childRepository;
        this.userRepository = userRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public ChildDTO createChild(ChildDTO childDTO) {
        Child child = modelMapper.map(childDTO, Child.class);

        if (childDTO.getParentId() != 0) {
            User parent = userRepository.findById(childDTO.getParentId())
                                         .orElseThrow(() -> new RuntimeException("Parent not found"));
            child.setParent(parent);
        }

        child = childRepository.save(child);
        return modelMapper.map(child, ChildDTO.class);
    }

    @Override
    public ChildDTO getChildById(int id) {
        Child child = childRepository.findById(id).orElseThrow();
        return modelMapper.map(child, ChildDTO.class);
    }

    @Override
    public List<ChildDTO> getAllChildren() {
        return childRepository.findAll().stream()
                .map(child -> {
                    ChildDTO childDTO = modelMapper.map(child, ChildDTO.class);
                    if (child.getParent() != null) {
                        childDTO.setParentId(child.getParent().getUserId());
                    }
                    return childDTO;
                })
                .collect(Collectors.toList());
    }

    @Override
    public List<ChildDTO> getChildrenByParentId(int parentId) {
        return childRepository.findByParent_UserId(parentId).stream()
                .map(child -> modelMapper.map(child, ChildDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public ChildDTO updateChild(int id, ChildDTO childDTO) {
        Child child = childRepository.findById(id).orElseThrow();
        modelMapper.map(childDTO, child);

        if (childDTO.getParentId() != 0) {
            User parent = userRepository.findById(childDTO.getParentId())
                                         .orElseThrow(() -> new RuntimeException("Parent not found"));
            child.setParent(parent);
        }

        child = childRepository.save(child);
        return modelMapper.map(child, ChildDTO.class);
    }

    @Override
    public void deleteChild(int id) {
        childRepository.deleteById(id);
    }
}
