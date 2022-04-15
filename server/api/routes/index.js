//routes - provides mapping between URL and actual JS function when a particular URL is called - have the definations of all the URL's and which controller function has to be called
import usersRouter from "./user-router.js";
import propertiesRouter from "./property-router.js";
//to initialize all routes in this file , ex- login,payment, etc
export default (app) => {
  app.use("/", usersRouter);
  //app.use("/", propertiesRouter);
  // If response is 404 then return folling message
  app.use(function (req, res, next) {
    res.status(404).json({
      message: "Unable to find the requested resource!",
    });
  });
};
