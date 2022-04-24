import Job from "../models/Job.js";
import { StatusCodes } from "http-status-codes";
import {
  BadRequestError,
  doesNotExistError,
  UnAuthenticated,
} from "../errors/index.js";
import checkPermissions from "../utils/checkPermission.js";
import mongoose from "mongoose";

const createJob = async (req, res) => {
  const { position, company } = req.body;

  if (!position || !company) {
    throw new BadRequestError("Please Provide All Values");
  }

  req.body.createdBy = req.user.userId;

  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};

const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userId });
  res
    .status(StatusCodes.OK)
    .json({ jobs, totalJobs: jobs.length, numOfPages: 1 });
};
const updateJob = async (req, res) => {
  const { id: jobId } = req.params;
  const { company, position } = req.body;

  if (!position || !company) {
    throw new BadRequestError("Please provide all values");
  }

  const job = await Job.findOne({ _id: jobId });
  if (!job) {
    throw new doesNotExistError(`No job with id: ${jobId}`);
  }

  //check permissions
  console.log(typeof req.user.userId);
  console.log(typeof job.createdBy);

  checkPermissions(req.user, job.createdBy);

  const jobUpdate = await Job.findOneAndUpdate({ _id: jobId }, req.body, {
    new: true,
    runValidators: true,
  });

  // job.position = position
  // job.company = company
  // job.jobLocation = jobLocation
  // await job.save()
  res.status(StatusCodes.OK).json({ jobUpdate });
};
const deleteJob = async (req, res) => {
  const { id: jobId } = req.params;
  const job = await Job.findOne({ _id: jobId });

  if (!job) {
    throw new doesNotExistError(`No job found with id: ${jobId}`);
  }

  checkPermissions(req.user, job.createdBy);

  await job.remove();

  res.status(StatusCodes.OK).json({ msg: "Success! Job Deleted" });
};

//using aggregation pipeline to show statistics of the Jobs - array of matches and groups
const showStats = async (req, res) => {
  let stats = await Job.aggregate([
    //match is used to filter all the jobs created by a certain user
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    //grouping them on based on job status and count of each group
    { $group: { _id: "$status", count: { $sum: 1 } } },
  ]);
  //res.send("show stats");
  res.status(StatusCodes.OK).json({ stats });
};

export { createJob, deleteJob, getAllJobs, updateJob, showStats };
