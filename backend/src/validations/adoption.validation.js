import Joi from "joi";

export const createAdoptionSchema = Joi.object({
  petId: Joi.string().hex().length(24).required(),
  message: Joi.string().trim().allow("").optional(),
});

export const updateAdoptionStatusSchema = Joi.object({
  status: Joi.string().valid("approved", "rejected").required(),
  reason: Joi.string().trim().allow("").optional(),
});

export const adoptionIdParamSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
});