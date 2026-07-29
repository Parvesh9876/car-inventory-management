import { useEffect, useState } from "react";
import { Pencil, X } from "lucide-react";

import { updateVehicle } from "../../api/vehicle.api";

/**
 * EditVehicleModal
 *
 * Allows an admin to update an existing vehicle.
 *
 * The selected vehicle is received from Dashboard
 * through the "vehicle" prop.
 */
const EditVehicleModal = ({
  vehicle,
  onClose,
  onSuccess,
}) => {
  const [formData, setFormData] = useState({
    make: "",
    model: "",
    category: "",
    price: "",
    quantity: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /**
   * Whenever a vehicle is selected,
   * populate the form with its current data.
   */
  useEffect(() => {
    if (vehicle) {
      setFormData({
        make: vehicle.make || "",
        model: vehicle.model || "",
        category: vehicle.category || "",
        price: vehicle.price ?? "",
        quantity: vehicle.quantity ?? "",
      });
    }
  }, [vehicle]);

  /**
   * Update form state when an input changes.
   */
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  /**
   * Submit updated vehicle information.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      setError("");

      await updateVehicle(vehicle._id, {
        make: formData.make.trim(),
        model: formData.model.trim(),
        category: formData.category,
        price: Number(formData.price),
        quantity: Number(formData.quantity),
      });

      // Reload inventory.
      await onSuccess();

      // Close modal.
      onClose();
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to update vehicle."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-blue-500/10 p-2">
              <Pencil className="h-5 w-5 text-blue-400" />
            </div>

            <div>
              <h2 className="font-semibold text-white">
                Edit Vehicle
              </h2>

              <p className="text-xs text-slate-400">
                Update vehicle information
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5 p-6"
        >
          {error && (
            <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {error}
            </div>
          )}

          {/* Make + Model */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Make
              </label>

              <input
                type="text"
                name="make"
                value={formData.make}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Model
              </label>

              <input
                type="text"
                name="model"
                value={formData.model}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Category
            </label>

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500"
            >
              <option value="">Select category</option>
              <option value="SUV">SUV</option>
              <option value="Sedan">Sedan</option>
              <option value="Hatchback">Hatchback</option>
              <option value="Truck">Truck</option>
              <option value="Coupe">Coupe</option>
            </select>
          </div>

          {/* Price + Quantity */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Price
              </label>

              <input
                type="number"
                name="price"
                min="0"
                value={formData.price}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Quantity
              </label>

              <input
                type="number"
                name="quantity"
                min="0"
                value={formData.quantity}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 border-t border-slate-800 pt-5">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-700 px-5 py-2.5 text-sm font-medium text-slate-300 hover:bg-slate-800"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-500 disabled:opacity-50"
            >
              <Pencil className="h-4 w-4" />

              {loading ? "Updating..." : "Update Vehicle"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditVehicleModal;