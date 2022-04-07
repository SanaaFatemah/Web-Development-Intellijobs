import express from "express";
import * as usersController from "./../controllers/users-controller.js";
const router = express.Router();

/** To route below API endpoint requests :
 * Search all the tasks - GET /items
 * Create task - POST /items
 */
router.route("/users").post(usersController.post).get(usersController.index);

/**  To route below API endpoint requests :
 * Retrieve task by id - GET /items/${id}
 * Update task by id - PUT /items/${id}
 * Delete task by id - DELETE /items/${id}
 */
router
  .route("/users/:id")
  .get(usersController.get)
  .put(usersController.update)
  .delete(usersController.remove);
export default router;
