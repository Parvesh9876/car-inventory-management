const express = require("express");

const vehicleController = require("../controllers/vehicle.controller");

const authenticate = require("../middlewares/auth.middleware");
const validate = require("../middlewares/validate.middleware");
const authorizeAdmin = require("../middlewares/admin.middleware");

const {
  createVehicleValidator,
    searchVehicleValidator,
    updateVehicleValidator
} = require("../validators/vehicle.validator");

const router = express.Router();

/**
 * POST /api/vehicles
 *
 * Add a new vehicle.
 * Protected route.
 */
router.post(
  "/",
  authenticate,
  authorizeAdmin,
  createVehicleValidator,
  validate,
  vehicleController.createVehicle
);

/**
 * GET /api/vehicles
 *
 * Get all vehicles.
 * Protected route.
 */
router.get(
  "/",
  authenticate,
  vehicleController.getAllVehicles
);

router.get(
  "/search",
  authenticate,
  searchVehicleValidator,
  validate,
  vehicleController.searchVehicles
);
router.put(
  "/:id",
  authenticate,
  authorizeAdmin,
  updateVehicleValidator,
  validate,
  vehicleController.updateVehicle
);
router.delete(
  "/:id",
  authenticate,
  authorizeAdmin,
  vehicleController.deleteVehicle
);

module.exports = router;