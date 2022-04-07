//controllers - is to extract info from req , call the service function and get the results from the service and set it to the response
import * as userServices from "../services/users-services.js";

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
    const user = await userServices.save(payload);
    setSuccessResponse(user, response);
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

    const users = await userServices.search(query);

    setSuccessResponse(users, response);
  } catch (error) {
    setErrorResponse(error, response);
  }
};

//To process GET by ID request
export const get = async (request, response) => {
  try {
    const id = request.params.id;
    const user = await userServices.get(id);
    setSuccessResponse(user, response);
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
    const user = await userServices.update(updated);
    setSuccessResponse(user, response);
  } catch (error) {
    setErrorResponse(error, response);
  }
};

//To process Delete request
export const remove = async (request, response) => {
  try {
    const id = request.params.id;
    const user = await userServices.remove(id);
    setSuccessResponse(
      { message: `successfully removed task item Number${id}` },
      response
    );
  } catch (error) {
    setErrorResponse(error, response);
  }
};
