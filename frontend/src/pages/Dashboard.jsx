import { useEffect, useState } from "react";
import { Plus } from "lucide-react";

// Components
import Navbar from "../components/Navbar";
import VehicleGrid from "../components/VehicleGrid";
import LoadingSpinner from "../components/LoadingSpinner";
import SearchFilters from "../components/SearchFilters";

// Admin Components
import VehicleForm from "../components/admin/VehicleForm";
import EditVehicleModal from "../components/admin/EditVehicleModal";
import RestockModal from "../components/admin/RestockModal";

// Context
import { useAuth } from "../context/AuthContext";

// API functions
import {
  deleteVehicle,
  getVehicles,
  purchaseVehicle,
  searchVehicles,
} from "../api/vehicle.api";

const Dashboard = () => {
  const { isAdmin } = useAuth();

  /**
   * ==========================================
   * STATE
   * ==========================================
   */

  // Vehicles currently displayed on dashboard
  const [vehicles, setVehicles] = useState([]);

  // Controls loading state
  const [loading, setLoading] = useState(true);

  // Stores API error messages
  const [error, setError] = useState("");

  /**
   * Controls Add Vehicle modal.
   */
  const [showAddVehicle, setShowAddVehicle] =
    useState(false);

  /**
   * Stores the vehicle selected for editing.
   *
   * null = modal closed
   * vehicle object = modal open
   */
  const [editingVehicle, setEditingVehicle] =
    useState(null);

  /**
   * Stores the vehicle selected for restocking.
   *
   * null = modal closed
   * vehicle object = modal open
   */
  const [restockingVehicle, setRestockingVehicle] =
    useState(null);

  /**
   * Search/filter values.
   */
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    minPrice: "",
    maxPrice: "",
  });

  /**
   * ==========================================
   * FETCH ALL VEHICLES
   * ==========================================
   *
   * Calls:
   *
   * GET /api/vehicles
   *
   * Used after:
   * - Dashboard loads
   * - Purchase
   * - Add
   * - Edit
   * - Delete
   * - Restock
   * - Reset filters
   */
  const fetchVehicles = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getVehicles();

      setVehicles(response.data || []);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to load vehicles."
      );
    } finally {
      setLoading(false);
    }
  };

  /**
   * Load inventory when Dashboard first renders.
   */
  useEffect(() => {
    fetchVehicles();
  }, []);

  /**
   * ==========================================
   * PURCHASE VEHICLE
   * ==========================================
   *
   * POST /api/vehicles/:id/purchase
   *
   * Available to authenticated users.
   * Backend decreases quantity by one.
   */
  const handlePurchase = async (vehicle) => {
    try {
      setError("");

      await purchaseVehicle(vehicle._id);

      // Refresh stock after successful purchase.
      await fetchVehicles();
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to purchase vehicle."
      );
    }
  };

  /**
   * ==========================================
   * DELETE VEHICLE
   * ==========================================
   *
   * DELETE /api/vehicles/:id
   *
   * Admin only.
   */
  const handleDelete = async (vehicle) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${vehicle.make} ${vehicle.model}?`
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");

      await deleteVehicle(vehicle._id);

      // Reload inventory after deletion.
      await fetchVehicles();
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to delete vehicle."
      );
    }
  };

  /**
   * ==========================================
   * EDIT VEHICLE
   * ==========================================
   *
   * When admin clicks Edit, store the selected
   * vehicle.
   *
   * This causes EditVehicleModal to render.
   */
  const handleEdit = (vehicle) => {
    setEditingVehicle(vehicle);
  };

  /**
   * ==========================================
   * RESTOCK VEHICLE
   * ==========================================
   *
   * When admin clicks Restock, store the selected
   * vehicle.
   *
   * This causes RestockModal to render.
   */
  const handleRestock = (vehicle) => {
    setRestockingVehicle(vehicle);
  };

  /**
   * ==========================================
   * FILTER CHANGE
   * ==========================================
   *
   * Handles changes from SearchFilters.
   */
  const handleFilterChange = (event) => {
    const { name, value } = event.target;

    setFilters((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  /**
   * ==========================================
   * SEARCH VEHICLES
   * ==========================================
   *
   * GET /api/vehicles/search
   *
   * Example:
   *
   * /api/vehicles/search
   * ?search=Toyota
   * &category=SUV
   * &minPrice=20000
   * &maxPrice=50000
   */
  const handleSearch = async () => {
    try {
      setLoading(true);
      setError("");

      /**
       * Prevent an invalid price range from being
       * sent to the backend.
       */
      if (
        filters.minPrice &&
        filters.maxPrice &&
        Number(filters.minPrice) > Number(filters.maxPrice)
      ) {
        setError(
          "Minimum price cannot be greater than maximum price."
        );
        return;
      }

      const query = {};

      /**
       * General search is sent as `search`.
       *
       * The backend can use this value to search
       * make OR model.
       *
       * Examples:
       * Toyota   -> matches vehicle make
       * Fortuner -> matches vehicle model
       */
      if (filters.search.trim()) {
        query.search = filters.search.trim();
      }

      if (filters.category) {
        query.category = filters.category;
      }

      if (filters.minPrice) {
        query.minPrice = filters.minPrice;
      }

      if (filters.maxPrice) {
        query.maxPrice = filters.maxPrice;
      }

      const response = await searchVehicles(query);

      setVehicles(response.data || []);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to search vehicles."
      );
    } finally {
      setLoading(false);
    }
  };

  /**
   * ==========================================
   * RESET FILTERS
   * ==========================================
   */
  const handleResetFilters = async () => {
    setFilters({
      search: "",
      category: "",
      minPrice: "",
      maxPrice: "",
    });

    await fetchVehicles();
  };

  /**
   * ==========================================
   * ADD VEHICLE SUCCESS
   * ==========================================
   *
   * Called by VehicleForm after successfully
   * creating a vehicle.
   */
  const handleVehicleAdded = async () => {
    await fetchVehicles();
  };

  /**
   * ==========================================
   * EDIT VEHICLE SUCCESS
   * ==========================================
   *
   * Called after PUT /api/vehicles/:id succeeds.
   */
  const handleVehicleUpdated = async () => {
    await fetchVehicles();
  };

  /**
   * ==========================================
   * RESTOCK SUCCESS
   * ==========================================
   *
   * Called after restocking succeeds.
   */
  const handleVehicleRestocked = async () => {
    await fetchVehicles();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* ======================================
          NAVBAR
      ======================================= */}

      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-10">
        {/* ====================================
            DASHBOARD HEADER
        ===================================== */}

        <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
              Dealership Inventory
            </p>

            <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
              Vehicle Inventory
            </h1>

            <p className="mt-2 text-slate-400">
              Browse available vehicles and manage dealership
              stock.
            </p>
          </div>

          {/* Add Vehicle is visible only for admins */}
          {isAdmin && (
            <button
              type="button"
              onClick={() => setShowAddVehicle(true)}
              className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold transition hover:bg-blue-500"
            >
              <Plus className="h-5 w-5" />

              Add Vehicle
            </button>
          )}
        </div>

        {/* ====================================
            SEARCH & FILTERS
        ===================================== */}

        <SearchFilters
          filters={filters}
          onChange={handleFilterChange}
          onSearch={handleSearch}
          onReset={handleResetFilters}
        />

        {/* ====================================
            API ERROR
        ===================================== */}

        {error && (
          <div className="mb-6 rounded-xl border border-red-500/20 bg-red-500/10 px-5 py-4 text-sm text-red-300">
            {error}
          </div>
        )}

        {/* ====================================
            INVENTORY INFORMATION
        ===================================== */}

        {!loading && (
          <div className="mb-5 flex items-center justify-between">
            <p className="text-sm text-slate-400">
              Showing{" "}
              <span className="font-semibold text-white">
                {vehicles.length}
              </span>{" "}
              {vehicles.length === 1
                ? "vehicle"
                : "vehicles"}
            </p>
          </div>
        )}

        {/* ====================================
            VEHICLE INVENTORY
        ===================================== */}

        {loading ? (
          <LoadingSpinner />
        ) : (
          <VehicleGrid
            vehicles={vehicles}
            onPurchase={handlePurchase}
            onDelete={handleDelete}
            onEdit={handleEdit}
            onRestock={handleRestock}
          />
        )}
      </main>

      {/* ======================================
          ADD VEHICLE MODAL
      ======================================= */}

      {showAddVehicle && (
        <VehicleForm
          onClose={() => setShowAddVehicle(false)}
          onSuccess={handleVehicleAdded}
        />
      )}

      {/* ======================================
          EDIT VEHICLE MODAL
      ======================================= */}

      {editingVehicle && (
        <EditVehicleModal
          vehicle={editingVehicle}
          onClose={() => setEditingVehicle(null)}
          onSuccess={handleVehicleUpdated}
        />
      )}

      {/* ======================================
          RESTOCK VEHICLE MODAL
      ======================================= */}

      {restockingVehicle && (
        <RestockModal
          vehicle={restockingVehicle}
          onClose={() => setRestockingVehicle(null)}
          onSuccess={handleVehicleRestocked}
        />
      )}
    </div>
  );
};

export default Dashboard;