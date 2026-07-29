const vehicleService = require("../services/vehicle.service");

/**
 * Create Vehicle Controller
 */
const createVehicle = async (req, res, next) => {
  try {
    const vehicle = await vehicleService.createVehicle(req.body);

    return res.status(201).json({
      success: true,
      message: "Vehicle added successfully",
      data: vehicle,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get All Vehicles Controller
 */
const getAllVehicles = async (req, res, next) => {
  try {
    const vehicles = await vehicleService.getAllVehicles();

    return res.status(200).json({
      success: true,
      count: vehicles.length,
      data: vehicles,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Search Vehicles Controller
 */
const searchVehicles = async (req, res, next) => {
  try {
    const vehicles = await vehicleService.searchVehicles(req.query);

    return res.status(200).json({
      success: true,
      count: vehicles.length,
      data: vehicles,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update Vehicle Controller
 */
const updateVehicle = async (req, res, next) => {
  try {
    const vehicle = await vehicleService.updateVehicle(
      req.params.id,
      req.body
    );

    return res.status(200).json({
      success: true,
      message: "Vehicle updated successfully",
      data: vehicle,
    });
  } catch (error) {
    next(error);
  }
};
/**
 * Delete Vehicle Controller
 */
const deleteVehicle = async (req, res, next) => {
  try {
    await vehicleService.deleteVehicle(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Vehicle deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
/**
 * Purchase Vehicle Controller
 */
const purchaseVehicle = async (req, res, next) => {
  try {
    const vehicle = await vehicleService.purchaseVehicle(
      req.params.id
    );

    return res.status(200).json({
      success: true,
      message: "Vehicle purchased successfully",
      data: vehicle,
    });
  } catch (error) {
    next(error);
  }
};
/**
 * Restock Vehicle Controller
 */
const restockVehicle = async (req, res, next) => {
  try {
    const vehicle = await vehicleService.restockVehicle(
      req.params.id,
      Number(req.body.quantity)
    );

    return res.status(200).json({
      success: true,
      message: "Vehicle restocked successfully",
      data: vehicle,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createVehicle,
  getAllVehicles,
    searchVehicles,
    updateVehicle,
    deleteVehicle,
    purchaseVehicle,
    restockVehicle,
};