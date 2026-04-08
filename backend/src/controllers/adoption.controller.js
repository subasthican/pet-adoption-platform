import * as adoptionService from "../services/adoption.service.js";
import { sendSuccess } from "../helpers/response.helper.js";

export const createAdoptionRequest = async (req, res, next) => {
  try {
    const adoption = await adoptionService.createAdoptionRequest(
      req.body,
      req.user._id
    );
    return sendSuccess(res, 201, "Adoption request submitted successfully", adoption);
  } catch (error) {
    next(error);
  }
};

export const getAllAdoptions = async (req, res, next) => {
  try {
    const adoptions = await adoptionService.getAllAdoptions();
    return sendSuccess(res, 200, "Adoptions fetched successfully", adoptions);
  } catch (error) {
    next(error);
  }
};

export const updateAdoptionStatus = async (req, res, next) => {
  try {
    const adoption = await adoptionService.updateAdoptionStatus(
      req.params.id,
      req.body
    );
    return sendSuccess(res, 200, "Adoption status updated successfully", adoption);
  } catch (error) {
    next(error);
  }
};