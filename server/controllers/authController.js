import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../errors/index.js";

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new BadRequestError("Please provide all the values");
  }
  const userAlreadyExists = await User.findOne({ email });
  if (userAlreadyExists) {
    throw new BadRequestError("Email already in use");
  }
  const user = await User.create({ name, email, password });
  const token = user.newJWT();
  res
    .status(StatusCodes.CREATED) //hiding the user password in the response
    .json({
      user: {
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        location: user.location,
      },
      token,
    });
};
const loginUser = async (req, res) => {
  res.send("User logged in");
};
const updateUser = async (req, res) => {
  res.send("updated the user");
  // User.findOneAndUpdate;
};

export { registerUser, loginUser, updateUser };
