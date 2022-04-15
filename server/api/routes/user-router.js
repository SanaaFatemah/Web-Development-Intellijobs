import express from "express";
import * as usersController from "./../controllers/users-controller.js";
import * as propertiesController from "./../controllers/properties-controller.js";
const router = express.Router();

/** To route below API endpoint requests :
 * Search all the users - GET /users
 * Create users - POST /users
 */

router
  .route("/properties")
  .post(propertiesController.post)
  .get(propertiesController.index);

router.route("/users").post(usersController.post).get(usersController.index);
/**  To route below API endpoint requests :
 * Retrieve user by id - GET /users/${id}
 * Update user by id - PUT /users/${id}
 * Delete user by id - DELETE /users/${id}
 */
router
  .route("/users/:id")
  .get(usersController.get)
  .put(usersController.update)
  .delete(usersController.remove);

router
  .route("/properties/:id")
  .get(propertiesController.get)
  .put(propertiesController.update)
  .delete(propertiesController.remove);

router
  .route("/properties")
  .post(propertiesController.post)
  .get(propertiesController.index);

/**  To route below API endpoint requests :
 * Retrieve user by id - GET /users/${id}
 * Update user by id - PUT /users/${id}
 * Delete user by id - DELETE /users/${id}
 */

export default router;
