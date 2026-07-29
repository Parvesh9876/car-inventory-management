import { useState } from "react";
import { PackagePlus, X } from "lucide-react";

import { restockVehicle } from "../../api/vehicle.api";

/**
 * RestockModal
 *
 * Allows an admin to increase the quantity
 * of an existing vehicle.
 */
const RestockModal = ({
  vehicle,
  onClose,
  onSuccess,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const restockQuantity = Number(quantity);

    if (restockQuantity <= 0) {
      setError("Restock quantity must be greater than 0.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await restockVehicle(
        vehicle._id,
        restockQuantity
      );

      await onSuccess();

      onClose();
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to restock vehicle."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-emerald-500/10 p-2">
              <PackagePlus className="h-5 w-5 text-emerald-400" />
            </div>

            <div>
              <h2 className="font-semibold text-white">
                Restock Vehicle
              </h2>

              <p className="text-xs text-slate-400">
                Increase available inventory
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

        <form
          onSubmit={handleSubmit}
          className="space-y-5 p-6"
        >
          {/* Selected vehicle */}
          <div className="rounded-xl bg-slate-950 p-4">
            <p className="text-xs uppercase tracking-wider text-slate-500">
              Vehicle
            </p>

            <p className="mt-1 font-semibold text-white">
              {vehicle.make} {vehicle.model}
            </p>

            <p className="mt-1 text-sm text-slate-400">
              Current stock: {vehicle.quantity}
            </p>
          </div>

          {error && (
            <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {error}
            </div>
          )}

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Quantity to add
            </label>

            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(event) =>
                setQuantity(event.target.value)
              }
              required
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500"
            />
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-4">
            <p className="text-sm text-slate-400">
              New stock after restock
            </p>

            <p className="mt-1 text-xl font-bold text-white">
              {vehicle.quantity +
                (Number(quantity) || 0)}
            </p>
          </div>

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
              className="flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-500 disabled:opacity-50"
            >
              <PackagePlus className="h-4 w-4" />

              {loading ? "Restocking..." : "Restock"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RestockModal;