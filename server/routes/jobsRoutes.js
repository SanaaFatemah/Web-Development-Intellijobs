import express from "express";
const router = express.Router();

import {
  createNewJob,
  deleteJob,
  getAllJobs,
  updateJob,
  showStats,
} from "../controllers/jobsController.js";

router.route("/").post(createNewJob).get(getAllJobs);
router.route("/stats").get(showStats).get(showStats);
router.route("/:id").delete(deleteJob).put(updateJob);

export default router;
