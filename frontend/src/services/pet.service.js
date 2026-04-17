import api from "./api";

export const getAllPets = async () => {
  const response = await api.get("/pets");
  return response.data;
};

export const getPetById = async (id) => {
  const response = await api.get(`/pets/${id}`);
  return response.data;
};

export const createPet = async (formData) => {
  const response = await api.post("/pets", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const updatePetById = async (id, formData) => {
  const response = await api.put(`/pets/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const deletePetById = async (id) => {
  const response = await api.delete(`/pets/${id}`);
  return response.data;
};

export const searchPets = async (query) => {
  const response = await api.get(`/pets/search?q=${encodeURIComponent(query)}`);
  return response.data;
};

export const filterPetsByMood = async (mood) => {
  const response = await api.get(`/pets/filter?mood=${encodeURIComponent(mood)}`);
  return response.data;
};