const Vehicle = require("../models/Vehicle");

/**
 * Create a new vehicle.
 */
const createVehicle = async (vehicleData) => {
  const { make, model, category, price, quantity } = vehicleData;

  const vehicle = await Vehicle.create({
    make,
    model,
    category,
    price,
    quantity,
  });

  return vehicle;
};

/**
 * Get all vehicles.
 */
const getAllVehicles = async () => {
  const vehicles = await Vehicle.find().sort({
    createdAt: -1,
  });

  return vehicles;
};


/**
 * Search vehicles using optional filters.
 *
 * Supported filters:
 * - make
 * - model
 * - category
 * - minPrice
 * - maxPrice
 */
/**
 * Search vehicles using optional filters.
 *
 * Supported filters:
 * - search    -> searches make OR model
 * - make      -> optional direct make search
 * - model     -> optional direct model search
 * - category
 * - minPrice
 * - maxPrice
 */
const searchVehicles = async (filters) => {
  const {
    search,
    make,
    model,
    category,
    minPrice,
    maxPrice,
  } = filters;

  // MongoDB query object
  const query = {};

  /**
   * General search.
   *
   * Example:
   * search=Toyota
   *
   * Matches:
   * make = Toyota
   * OR
   * model containing Toyota
   *
   * Example:
   * search=Fortuner
   *
   * Matches model = Fortuner.
   */
  if (search) {
    query.$or = [
      {
        make: {
          $regex: search,
          $options: "i",
        },
      },
      {
        model: {
          $regex: search,
          $options: "i",
        },
      },
    ];
  }

  /**
   * Keep direct make/model filtering available
   * in case the API is called directly.
   */
  if (make) {
    query.make = {
      $regex: make,
      $options: "i",
    };
  }

  if (model) {
    query.model = {
      $regex: model,
      $options: "i",
    };
  }

  /**
   * Category filter.
   */
  if (category) {
    query.category = {
      $regex: category,
      $options: "i",
    };
  }

  /**
   * Price range filter.
   */
  if (minPrice !== undefined || maxPrice !== undefined) {
    query.price = {};

    if (minPrice !== undefined) {
      query.price.$gte = Number(minPrice);
    }

    if (maxPrice !== undefined) {
      query.price.$lte = Number(maxPrice);
    }
  }

  /**
   * Execute MongoDB query.
   *
   * Newest vehicles appear first.
   */
  const vehicles = await Vehicle.find(query).sort({
    createdAt: -1,
  });

  return vehicles;
};

/**
 * Update an existing vehicle.
 */
const updateVehicle = async (vehicleId, vehicleData) => {
  const vehicle = await Vehicle.findByIdAndUpdate(
    vehicleId,
    vehicleData,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!vehicle) {
    const error = new Error("Vehicle not found");
    error.statusCode = 404;
    throw error;
  }

  return vehicle;
};
/**
 * Delete vehicle by ID.
 */
const deleteVehicle = async (vehicleId) => {
  const vehicle = await Vehicle.findByIdAndDelete(vehicleId);

  if (!vehicle) {
    const error = new Error("Vehicle not found");
    error.statusCode = 404;
    throw error;
  }

  return vehicle;
};

/**
 * Purchase a vehicle.
 *
 * Atomically decreases quantity by 1 only when
 * the vehicle currently has stock available.
 */
const purchaseVehicle = async (vehicleId) => {
  const vehicle = await Vehicle.findOneAndUpdate(
    {
      _id: vehicleId,
      quantity: { $gt: 0 },
    },
    {
      $inc: { quantity: -1 },
    },
    {
      new: true,
      runValidators: true,
    }
  );

  if (vehicle) {
    return vehicle;
  }

  // findOneAndUpdate returning null can mean either:
  // 1. vehicle doesn't exist
  // 2. vehicle exists but quantity is 0
  const existingVehicle = await Vehicle.findById(vehicleId);

  if (!existingVehicle) {
    const error = new Error("Vehicle not found");
    error.statusCode = 404;
    throw error;
  }

  const error = new Error("Vehicle is out of stock");
  error.statusCode = 400;
  throw error;
};
/**
 * Restock vehicle inventory.
 *
 * Atomically increases the existing quantity.
 */
const restockVehicle = async (vehicleId, quantity) => {
  const vehicle = await Vehicle.findByIdAndUpdate(
    vehicleId,
    {
      $inc: {
        quantity: quantity,
      },
    },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!vehicle) {
    const error = new Error("Vehicle not found");
    error.statusCode = 404;
    throw error;
  }

  return vehicle;
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