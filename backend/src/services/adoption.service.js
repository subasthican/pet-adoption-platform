import Adoption from "../models/adoption.model.js";
import Pet from "../models/pet.model.js";
import ApiError from "../helpers/ApiError.helper.js";
import { ADOPTION_STATUS, PET_STATUS } from "../utils/constants.js";

export const createAdoptionRequest = async (payload, customerId) => {
  const pet = await Pet.findById(payload.petId);

  if (!pet) {
    throw new ApiError(404, "Pet not found");
  }

  if (pet.adoptionStatus === PET_STATUS.ADOPTED) {
    throw new ApiError(400, "This pet is already adopted");
  }

  const existingPendingRequest = await Adoption.findOne({
    pet: payload.petId,
    customer: customerId,
    status: ADOPTION_STATUS.PENDING,
  });

  if (existingPendingRequest) {
    throw new ApiError(409, "You already have a pending request for this pet");
  }

  const adoption = await Adoption.create({
    pet: payload.petId,
    customer: customerId,
    message: payload.message || "",
  });

  return adoption;
};

export const getAllAdoptions = async () => {
  return Adoption.find()
    .populate("pet", "name species image adoptionStatus")
    .populate("customer", "name email role")
    .sort({ createdAt: -1 });
};

export const updateAdoptionStatus = async (id, payload) => {
  const adoption = await Adoption.findById(id).populate("pet");

  if (!adoption) {
    throw new ApiError(404, "Adoption request not found");
  }

  adoption.status = payload.status;
  adoption.reason = payload.reason || "";

  if (payload.status === ADOPTION_STATUS.APPROVED) {
    adoption.pet.adoptionStatus = PET_STATUS.ADOPTED;
    adoption.pet.adoptedAt = new Date();
    await adoption.pet.save();
  }

  await adoption.save();

  return adoption;
};