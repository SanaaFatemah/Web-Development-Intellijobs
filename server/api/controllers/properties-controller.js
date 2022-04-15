//controllers - is to extract info from req , call the service function and get the results from the service and set it to the response
import * as propertyServices from "../services/properties-services.js";

//To handle error from the server
const setErrorResponse = (obj, response) => {
  response.status(500);
  response.json(error);
  console.log(error);
};

const setSuccessResponse = (obj, response) => {
  response.status(200);
  response.json(obj);
};

export const post = async (request, response) => {
  try {
    const payload = request.body;
    const property = await propertyServices.save(payload);
    setSuccessResponse(property, response);
  } catch (error) {
    setErrorResponse(error, response);
  }
};

//To process GET request
export const index = async (request, response) => {
  try {
    const id = request.query.id;
    const query = {};
    if (id) {
      query.id = id;
    }

    const properties = await propertyServices.search(query);

    setSuccessResponse(properties, response);
  } catch (error) {
    setErrorResponse(error, response);
  }
};

//To process GET by ID request
export const get = async (request, response) => {
  try {
    const id = request.params.id;
    const property = await propertyServices.get(id);
    setSuccessResponse(property, response);
  } catch (error) {
    setErrorResponse(error, response);
  }
};

//To process Update request
export const update = async (request, response) => {
  try {
    const id = request.params.id;
    const updated = { ...request.body };
    updated.id = id;
    const property = await propertyServices.update(updated);
    setSuccessResponse(property, response);
  } catch (error) {
    setErrorResponse(error, response);
  }
};

//To process Delete request
export const remove = async (request, response) => {
  try {
    const id = request.params.id;
    const property = await propertyServices.remove(id);
    setSuccessResponse(
      { message: `successfully removed the property${id}` },
      response
    );
  } catch (error) {
    setErrorResponse(error, response);
  }
};
