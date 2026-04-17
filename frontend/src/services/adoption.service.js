import api from "./api";

export const getAllAdoptions = async () => {
  const response = await api.get("/adoptions");
  return response.data;
};

export const updateAdoptionStatus = async (id, payload) => {
  const response = await api.patch(`/adoptions/${id}/status`, payload);
  return response.data;
};