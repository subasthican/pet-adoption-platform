import mongoose from "mongoose";
import calculateMood from "../utils/calculateMood.js";
import { PET_STATUS } from "../utils/constants.js";

const petSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    species: {
      type: String,
      required: true,
      trim: true,
    },
    breed: {
      type: String,
      trim: true,
      default: "",
    },
    age: {
      type: Number,
      required: true,
      min: 0,
    },
    personality: {
      type: String,
      trim: true,
      default: "",
    },
    image: {
      type: String,
      default: "",
    },
    adoptionStatus: {
      type: String,
      enum: [PET_STATUS.AVAILABLE, PET_STATUS.ADOPTED],
      default: PET_STATUS.AVAILABLE,
    },
    adoptedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

petSchema.virtual("mood").get(function () {
  return calculateMood(this.createdAt);
});

const Pet = mongoose.model("Pet", petSchema);

export default Pet;