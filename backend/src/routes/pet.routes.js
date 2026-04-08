import express from "express";
import * as petController from "../controllers/pet.controller.js";
import validate from "../middlewares/validate.middleware.js";
import upload from "../middlewares/upload.middleware.js";
import { protect, authorize } from "../middlewares/auth.middleware.js";
import {
  createPetSchema,
  updatePetSchema,
  petIdParamSchema,
  filterPetSchema,
  searchPetSchema,
} from "../validations/pet.validation.js";

const router = express.Router();

router.get("/", petController.getAllPets);
router.get("/filter", validate(filterPetSchema, "query"), petController.filterPetsByMood);
router.get("/search", validate(searchPetSchema, "query"), petController.searchPets);
router.get("/:id", validate(petIdParamSchema, "params"), petController.getPetById);

router.post(
  "/",
  protect,
  authorize("admin"),
  upload.single("image"),
  validate(createPetSchema),
  petController.createPet
);

router.put(
  "/:id",
  protect,
  authorize("admin"),
  validate(petIdParamSchema, "params"),
  upload.single("image"),
  validate(updatePetSchema),
  petController.updatePet
);

router.delete(
  "/:id",
  protect,
  authorize("admin"),
  validate(petIdParamSchema, "params"),
  petController.deletePet
);

router.patch(
  "/:id/adopt",
  protect,
  authorize("admin"),
  validate(petIdParamSchema, "params"),
  petController.adoptPetByAdmin
);

export default router;