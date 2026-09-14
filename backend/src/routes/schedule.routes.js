import express from "express";

import {
  createScheduleController,
  deleteScheduleController,
  getAllSchedulesController,
  getScheduleByIdController,
  updateScheduleController,
} from "../controllers/schedule.controller.js";

import { protect } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/authorize.middleware.js";

import validate from "../middleware/validate.middleware.js";

import {
  createScheduleSchema,
  updateScheduleSchema,
} from "../validators/schedule.validator.js";

const router = express.Router();

// Consultation
router.get("/", getAllSchedulesController);

router.get("/:id", getScheduleByIdController);

// Admin only
router.post(
  "/",
  protect,
  authorize("admin"),
  validate(createScheduleSchema),
  createScheduleController
);

router.patch(
  "/:id",
  protect,
  authorize("admin"),
  validate(updateScheduleSchema),
  updateScheduleController
);

router.delete(
  "/:id",
  protect,
  authorize("admin"),
  deleteScheduleController
);

export default router;