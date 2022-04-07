import express from "express";
import * as usersController from "./../controllers/users-controller.js";
const router = express.Router();

/** To route below API endpoint requests :
 * Search all the users - GET /users
 * Create users - POST /users
 */
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
export default router;
