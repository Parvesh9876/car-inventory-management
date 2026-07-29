import api from "./axios";

/**
 * Get all available vehicles.
 */
export const getVehicles = async () => {
  const response = await api.get("/vehicles");

  return response.data;
};

/**
 * Search/filter vehicles.
 */
export const searchVehicles = async (filters) => {
  const response = await api.get("/vehicles/search", {
    params: filters,
  });

  return response.data;
};

/**
 * Add a vehicle.
 * Admin only.
 */
export const createVehicle = async (vehicleData) => {
  const response = await api.post(
    "/vehicles",
    vehicleData
  );

  return response.data;
};

/**
 * Update vehicle.
 * Admin only.
 */
export const updateVehicle = async (
  vehicleId,
  vehicleData
) => {
  const response = await api.put(
    `/vehicles/${vehicleId}`,
    vehicleData
  );

  return response.data;
};

/**
 * Delete vehicle.
 * Admin only.
 */
export const deleteVehicle = async (vehicleId) => {
  const response = await api.delete(
    `/vehicles/${vehicleId}`
  );

  return response.data;
};

/**
 * Purchase one vehicle.
 */
export const purchaseVehicle = async (vehicleId) => {
  const response = await api.post(
    `/vehicles/${vehicleId}/purchase`
  );

  return response.data;
};

/**
 * Increase vehicle inventory.
 * Admin only.
 */
export const restockVehicle = async (
  vehicleId,
  quantity
) => {
  const response = await api.post(
    `/vehicles/${vehicleId}/restock`,
    {
      quantity,
    }
  );

  return response.data;
};