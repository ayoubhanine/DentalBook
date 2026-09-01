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
import validate  from "../middleware/validate.middleware.js";
import { authorize } from "../middleware/authorize.middleware.js";

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
router.get("/",
   authorize("admin") ,
   getAllAppointmentsController);

// Récupérer les rendez-vous du patient connecté
router.get("/my", getMyAppointmentsController);


router.get("/:id", getAppointmentByIdController);


router.patch(
  "/:id",
  authorize("admin"),
  validate(updateAppointmentSchema),
  updateAppointmentController,
);


router.delete("/:id",
  authorize("admin"),
   deleteAppointmentController);

export default router;
