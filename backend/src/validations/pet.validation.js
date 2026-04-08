import Joi from "joi";

export const createPetSchema = Joi.object({
  name: Joi.string().trim().min(2).max(50).required(),
  species: Joi.string().trim().min(2).max(50).required(),
  breed: Joi.string().trim().allow("").optional(),
  age: Joi.number().min(0).required(),
  personality: Joi.string().trim().allow("").optional(),
});

export const updatePetSchema = Joi.object({
  name: Joi.string().trim().min(2).max(50).optional(),
  species: Joi.string().trim().min(2).max(50).optional(),
  breed: Joi.string().trim().allow("").optional(),
  age: Joi.number().min(0).optional(),
  personality: Joi.string().trim().allow("").optional(),
}).min(1);

export const petIdParamSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
});

export const filterPetSchema = Joi.object({
  mood: Joi.string().valid("Happy", "Excited", "Sad").required(),
});

export const searchPetSchema = Joi.object({
  q: Joi.string().trim().min(1).required(),
});