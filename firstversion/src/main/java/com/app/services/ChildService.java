package com.app.services;

import java.util.List;

import com.app.dto.ChildDTO;

public interface ChildService {
    ChildDTO createChild(ChildDTO childDTO);
    ChildDTO getChildById(int id);
    List<ChildDTO> getAllChildren();
    List<ChildDTO> getChildrenByParentId(int parentId);
    ChildDTO updateChild(int id, ChildDTO childDTO);
    void deleteChild(int id);
	int getParentIdByChildId(int childId);
}
