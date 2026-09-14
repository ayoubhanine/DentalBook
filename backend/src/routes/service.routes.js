import express from "express";

import {
  createServiceController,
  deleteServiceController,
  getAllServicesController,
  getServiceByIdController,
  updateServiceController,
} from "../controllers/service.controller.js";

import { protect } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/authorize.middleware.js";

import validate from "../middleware/validate.middleware.js";

import {
  createServiceSchema,
  updateServiceSchema,
} from "../validators/service.validator.js";

const router = express.Router();

// Public / authenticated users
router.get("/",protect, getAllServicesController);

router.get("/:id", getServiceByIdController);

// Admin only
router.post(
  "/",
  protect,
  authorize("admin"),
  validate(createServiceSchema),
  createServiceController
);

router.patch(
  "/:id",
  protect,
  authorize("admin"),
  validate(updateServiceSchema),
  updateServiceController
);

router.delete(
  "/:id",
  protect,
  authorize("admin"),
  deleteServiceController
);

export default router;