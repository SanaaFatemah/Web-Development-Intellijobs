//Service layer - most of our business logic which supports the model - is present - ex- endpoint search-logic and checks to search is in service layer
import User from "./../models/user.js";

//create new todo item.
export const save = (newUser) => {
  const user = new User(newUser);
  return user.save();
};

//returns all the todo items
export const search = (query) => {
  const params = { ...query };
  return User.find(params).exec();
};

//search for todo item by id
export const get = (id) => {
  const user = User.findById(id).exec();
  return user;
};

// Update an existing todo item by id
export const update = (updatedUser) => {
  updatedUser.lastModifiedDate = new Date();
  const user = User.findByIdAndUpdate(updatedUser.id, updatedUser, {
    new: true,
  }).exec();
  return user;
};

//Delete an todo item by id
export const remove = (id) => {
  const user = User.findByIdAndDelete(id).exec();
  return user;
};
