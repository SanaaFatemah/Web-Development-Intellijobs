import express from "express";
import * as propertiesController from "./../controllers/properties-controller.js";
const router = express.Router();

/** To route below API endpoint requests :
 * Search all the property - GET /properties
 * Create property - POST /properties
 */
router
  .route("/properties")
  .post(propertiesController.post)
  .get(propertiesController.index);

/**  To route below API endpoint requests :
 * Retrieve property by id - GET /properties/${id}
 * Update property by id - PUT /properties/${id}
 * Delete property by id - DELETE /properties/${id}
 */
router
  .route("/properties/:id")
  .get(propertiesController.get)
  .put(propertiesController.update)
  .delete(propertiesController.remove);
export default router;
