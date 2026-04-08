import Pet from "../models/pet.model.js";
import ApiError from "../helpers/ApiError.helper.js";
import pick from "../utils/pick.js";
import { PET_STATUS } from "../utils/constants.js";

export const createPet = async (payload, file) => {
  const pet = await Pet.create({
    ...payload,
    image: file ? `/uploads/${file.filename}` : "",
  });

  return pet;
};

export const getAllPets = async () => {
  return Pet.find().sort({ createdAt: -1 });
};

export const getPetById = async (id) => {
  const pet = await Pet.findById(id);

  if (!pet) {
    throw new ApiError(404, "Pet not found");
  }

  return pet;
};

export const updatePet = async (id, payload, file) => {
  const pet = await Pet.findById(id);

  if (!pet) {
    throw new ApiError(404, "Pet not found");
  }

  const updates = pick(payload, ["name", "species", "breed", "age", "personality"]);

  if (file) {
    updates.image = `/uploads/${file.filename}`;
  }

  Object.assign(pet, updates);
  await pet.save();

  return pet;
};

export const deletePet = async (id) => {
  const pet = await Pet.findById(id);

  if (!pet) {
    throw new ApiError(404, "Pet not found");
  }

  await pet.deleteOne();

  return null;
};

export const adoptPetByAdmin = async (id) => {
  const pet = await Pet.findById(id);

  if (!pet) {
    throw new ApiError(404, "Pet not found");
  }

  pet.adoptionStatus = PET_STATUS.ADOPTED;
  pet.adoptedAt = new Date();

  await pet.save();

  return pet;
};

export const filterPetsByMood = async (mood) => {
  const pets = await Pet.find().sort({ createdAt: -1 });
  return pets.filter((pet) => pet.mood === mood);
};

export const searchPets = async (query) => {
  return Pet.find({
    $or: [
      { name: { $regex: query, $options: "i" } },
      { species: { $regex: query, $options: "i" } },
    ],
  }).sort({ createdAt: -1 });
};