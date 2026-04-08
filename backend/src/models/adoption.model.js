import mongoose from "mongoose";
import { ADOPTION_STATUS } from "../utils/constants.js";

const adoptionSchema = new mongoose.Schema(
  {
    pet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pet",
      required: true,
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      trim: true,
      default: "",
    },
    status: {
      type: String,
      enum: [
        ADOPTION_STATUS.PENDING,
        ADOPTION_STATUS.APPROVED,
        ADOPTION_STATUS.REJECTED,
      ],
      default: ADOPTION_STATUS.PENDING,
    },
    reason: {
      type: String,
      trim: true,
      default: "",
    },
  },
  { timestamps: true }
);

const Adoption = mongoose.model("Adoption", adoptionSchema);

export default Adoption;