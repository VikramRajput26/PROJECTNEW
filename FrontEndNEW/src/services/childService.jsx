import { myAxios } from "./helper";

export const createChild = async (child) => {
  try {
    const response = await myAxios.post("/api/children/addchild", child);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getChildById = async (id) => {
  try {
    const response = await myAxios.get(`/api/children/getbyid/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllChildren = async () => {
  try {
    const response = await myAxios.get("/api/children/getallchild");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateChild = async (id, child) => {
  try {
    const response = await myAxios.put(`/api/children/update/${id}`, child);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteChild = async (id) => {
  try {
    await myAxios.delete(`/api/children/delete/${id}`);
  } catch (error) {
    throw error;
  }
};

export const getChildrenByParentId = async (parentId) => {
  try {
    const response = await myAxios.get(`/api/children/getbyparent/${parentId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
