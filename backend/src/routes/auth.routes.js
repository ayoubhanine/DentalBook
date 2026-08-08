import express from "express";

import { registerUser,loginUser,getCurrentUser } from "../controllers/auth.controller.js";
import validate from "../middleware/validate.middleware.js";
import { registerSchema,loginSchema } from "../validators/auth.validator.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();


router.post("/register", validate(registerSchema), registerUser);
router.post("/login",validate(loginSchema),loginUser)
router.get("/me",protect,getCurrentUser)

export default router;