import * as petService from "../services/pet.service.js";
import { sendSuccess } from "../helpers/response.helper.js";

export const createPet = async (req, res, next) => {
  try {
    const pet = await petService.createPet(req.body, req.file);
    return sendSuccess(res, 201, "Pet created successfully", pet);
  } catch (error) {
    next(error);
  }
};

export const getAllPets = async (req, res, next) => {
  try {
    const pets = await petService.getAllPets();
    return sendSuccess(res, 200, "Pets fetched successfully", pets);
  } catch (error) {
    next(error);
  }
};

export const getPetById = async (req, res, next) => {
  try {
    const pet = await petService.getPetById(req.params.id);
    return sendSuccess(res, 200, "Pet fetched successfully", pet);
  } catch (error) {
    next(error);
  }
};

export const updatePet = async (req, res, next) => {
  try {
    const pet = await petService.updatePet(req.params.id, req.body, req.file);
    return sendSuccess(res, 200, "Pet updated successfully", pet);
  } catch (error) {
    next(error);
  }
};

export const deletePet = async (req, res, next) => {
  try {
    await petService.deletePet(req.params.id);
    return sendSuccess(res, 200, "Pet deleted successfully");
  } catch (error) {
    next(error);
  }
};

export const adoptPetByAdmin = async (req, res, next) => {
  try {
    const pet = await petService.adoptPetByAdmin(req.params.id);
    return sendSuccess(res, 200, "Pet marked as adopted", pet);
  } catch (error) {
    next(error);
  }
};

export const filterPetsByMood = async (req, res, next) => {
  try {
    const pets = await petService.filterPetsByMood(req.query.mood);
    return sendSuccess(res, 200, "Pets filtered successfully", pets);
  } catch (error) {
    next(error);
  }
};

export const searchPets = async (req, res, next) => {
  try {
    const pets = await petService.searchPets(req.query.q);
    return sendSuccess(res, 200, "Pets searched successfully", pets);
  } catch (error) {
    next(error);
  }
};