import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Service name is required"],
      trim: true,
      minlength: [2, "Service name must be at least 2 characters"],
      maxlength: [100, "Service name cannot exceed 100 characters"],
    },

    description: {
      type: String,
      required: [true, "Service description is required"],
      trim: true,
      maxlength: [500, "Service description cannot exceed 500 characters"],
    },

    duration: {
      type: Number,
      required: [true, "Service duration is required"],
      min: [1, "Service duration must be greater than 0"],
    },

    price: {
      type: Number,
      required: [true, "Service price is required"],
      min: [0, "Service price cannot be negative"],
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Service = mongoose.model("Service", serviceSchema);

export default Service;