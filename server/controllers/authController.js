import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnAuthenticated } from "../errors/index.js";

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
//const loginUser = async (req, res) => {
// res.send("User logged in");
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide all values");
  }
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new UnAuthenticated("Invalid Credentials");
  }
  console.log(user);
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnAuthenticated("Invalid Credentials");
  }

  const token = user.newJWT();
  //to hide the password in response
  user.password = undefined;
  res.status(StatusCodes.OK).json({ user, token, location: user.location });
};

const updateUser = async (req, res) => {
  const {email, name, lastName, location} = req.body
  if(!email || !name || !lastName || !location) {
    throw new BadRequestError('Please fill all details!')
  }
  const user = await User.findOne({_id:req.user.userId});
  user.email = email
  user.name = name
  user.lastName = lastName
  user.location = location

  await user.save()

  const token = user.newJWT()
  res.status(StatusCodes.OK).json({ user, token, location: user.location });

  // res.send("updated the user");
  // User.findOneAndUpdate;
};

export { registerUser, loginUser, updateUser };
