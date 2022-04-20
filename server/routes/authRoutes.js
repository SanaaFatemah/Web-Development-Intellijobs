import express from "express";
const router = express.Router();

import {
  updateUser,
  registerUser,
  loginUser,
} from "../controllers/authController.js";

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/updateUser").put(updateUser);

export default router;
