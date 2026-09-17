// import express from "express";

// import {
//   getPatients,
//   getPatient,
//   removePatient,
// } from "../controllers/user.controller.js";


// import { protect } from "../middleware/auth.middleware.js";
// import { authorize } from "../middleware/authorize.middleware.js";

// const router = express.Router();

// router.use(protect);
// router.use(authorize("admin"));

// router.get("/patients", getPatients);
// router.get("/patients/:id", getPatient);
// router.delete("/patients/:id", removePatient);

// export default router;


import express from "express";

import {
  getPatients,
  getPatient,
  removePatient,
  getMe,
  updateMe,
} from "../controllers/user.controller.js";

import { protect } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/authorize.middleware.js";

const router = express.Router();

router.use(protect);

// Current authenticated user
router.get("/me", getMe);
router.patch("/me", updateMe);

// Admin patient management
router.get("/patients", authorize("admin"), getPatients);
router.get("/patients/:id", authorize("admin"), getPatient);
router.delete("/patients/:id", authorize("admin"), removePatient);

export default router;