import express from "express";

import {
  createAppointmentController,
  getAllAppointmentsController,
  getAppointmentByIdController,
  getMyAppointmentsController,
  updateAppointmentController,
  deleteAppointmentController,
} from "../controllers/appointment.controller.js";

import {
  createAppointmentSchema,
  updateAppointmentSchema,
} from "../validators/appointment.validator.js";
import { protect } from "../middleware/auth.middleware.js";
import validate  from "../middleware/validate.middleware.js"

const router = express.Router();

// Toutes les routes Appointment nécessitent une authentification
router.use(protect);

// Créer un rendez-vous
router.post(
  "/",
  validate(createAppointmentSchema),
  createAppointmentController,
);

// Récupérer tous les rendez-vous
router.get("/", getAllAppointmentsController);

// Récupérer les rendez-vous du patient connecté
// IMPORTANT : cette route doit être avant /:id
router.get("/my", getMyAppointmentsController);

// Récupérer un rendez-vous par ID
router.get("/:id", getAppointmentByIdController);

// Modifier un rendez-vous
router.patch(
  "/:id",
  validate(updateAppointmentSchema),
  updateAppointmentController,
);

// Supprimer un rendez-vous
router.delete("/:id", deleteAppointmentController);

export default router;
