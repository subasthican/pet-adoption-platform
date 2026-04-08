import express from "express";
import * as adoptionController from "../controllers/adoption.controller.js";
import validate from "../middlewares/validate.middleware.js";
import { protect, authorize } from "../middlewares/auth.middleware.js";
import {
  createAdoptionSchema,
  updateAdoptionStatusSchema,
  adoptionIdParamSchema,
} from "../validations/adoption.validation.js";

const router = express.Router();

router.post(
  "/",
  protect,
  authorize("customer"),
  validate(createAdoptionSchema),
  adoptionController.createAdoptionRequest
);

router.get(
  "/",
  protect,
  authorize("admin"),
  adoptionController.getAllAdoptions
);

router.patch(
  "/:id/status",
  protect,
  authorize("admin"),
  validate(adoptionIdParamSchema, "params"),
  validate(updateAdoptionStatusSchema),
  adoptionController.updateAdoptionStatus
);

export default router;