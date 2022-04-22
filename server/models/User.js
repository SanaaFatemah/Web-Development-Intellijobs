import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import token from "jsonwebtoken";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name"],
    minlength: 3,
    maxlength: 20,
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    unique: true,
    //using validator function to verify the email Id
    validate: {
      validator: validator.isEmail,
      message: "Please provide a valid email",
    },
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minlength: 6,
    select: false, //to hide password
  },
  lastName: {
    type: String,
    maxlength: 20,
    trim: true,
    default: "last name",
  },
  location: {
    type: String,
    maxlength: 20,
    trim: true,
    default: "my city",
  },
});

//method to hash user password using bcrypt package
UserSchema.pre("save", async function () {
  // console.log(this.modifiedPaths())
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

//adding JWT token using create JWT method - to restrict others views job created by a particular user
UserSchema.methods.newJWT = function () {
  // console.log(this);
  return token.sign({ userUniqId: this._id }, process.env.JWT_ENCKEY, {
    expiresIn: process.env.JWT_EXPIRY,
  });
};

UserSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

export default mongoose.model("User", UserSchema);
