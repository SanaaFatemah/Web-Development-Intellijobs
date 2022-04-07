//Service layer - most of our business logic which supports the model - is present - ex- endpoint search-logic and checks to search is in service layer
import House from "../models/property.js";

//create new House
export const save = (newUser) => {
  const user = new User(newUser);
  return user.save();
};

//returns all the users
export const search = (query) => {
  const params = { ...query };
  return User.find(params).exec();
};

//search for user by id
export const get = (id) => {
  const user = User.findById(id).exec();
  return user;
};

// Update an existing user by id
export const update = (updatedUser) => {
  updatedUser.lastModifiedDate = new Date();
  const user = User.findByIdAndUpdate(updatedUser.id, updatedUser, {
    new: true,
  }).exec();
  return user;
};

//Delete an user by id
export const remove = (id) => {
  const user = User.findByIdAndDelete(id).exec();
  return user;
};
