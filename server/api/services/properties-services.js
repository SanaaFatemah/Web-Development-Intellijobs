//Service layer - most of our business logic which supports the model - is present - ex- endpoint search-logic and checks to search is in service layer
import Property from "../models/property.js";

//create new property
export const save = (newProperty) => {
  const property = new User(newProperty);
  return property.save();
};

//returns all the users
export const search = (query) => {
  const params = { ...query };
  return Property.find(params).exec();
};

//search for user by id
export const get = (id) => {
  const property = Property.findById(id).exec();
  return property;
};

// Update an existing user by id
export const update = (updatedProperty) => {
  updatedProperty.lastModifiedDate = new Date();
  const property = Property.findByIdAndUpdate(
    updatedProperty.id,
    updatedProperty,
    {
      new: true,
    }
  ).exec();
  return property;
};

//Delete an user by id
export const remove = (id) => {
  const property = Property.findByIdAndDelete(id).exec();
  return property;
};
