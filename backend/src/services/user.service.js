
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
