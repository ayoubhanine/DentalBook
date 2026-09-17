
import mongoose from "mongoose";
import User from "../models/user.model.js";

export const getAllPatients = async () => {
  const patients = await User.find({ role: "patient" })
    .select("-password")
    .sort({ createdAt: -1 });

  return patients;
};

export const getPatientById = async (patientId) => {
  if (!mongoose.Types.ObjectId.isValid(patientId)) {
    throw new Error("Invalid patient ID");
  }

  const patient = await User.findOne({
    _id: patientId,
    role: "patient",
  }).select("-password");

  if (!patient) {
    throw new Error("Patient not found");
  }

  return patient;
};

export const deletePatient = async (patientId) => {
  if (!mongoose.Types.ObjectId.isValid(patientId)) {
    throw new Error("Invalid patient ID");
  }

  const patient = await User.findOneAndDelete({
    _id: patientId,
    role: "patient",
  });

  if (!patient) {
    throw new Error("Patient not found");
  }

  return patient;
};

export const getCurrentUser = async (userId) => {
  const user = await User.findById(userId).select("-password");

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

export const updateCurrentUser = async (userId, userData) => {
  const { firstName, lastName, phone } = userData;

  const user = await User.findByIdAndUpdate(
    userId,
    {
      firstName,
      lastName,
      phone,
    },
    {
      new: true,
      runValidators: true,
    }
  ).select("-password");

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};