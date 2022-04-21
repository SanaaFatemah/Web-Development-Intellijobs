import express from "express";
const router = express.Router();

import {
  updateUser,
  registerUser,
  loginUser,
} from "../controllers/authController.js";
import authenticateUser from '../middleware/auth.js'

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/updateUser").patch(authenticateUser, updateUser);

export default router;
