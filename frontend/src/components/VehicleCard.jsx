import {
  Car,
  Package,
  Pencil,
  ShoppingCart,
  Trash2,
  PackagePlus,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

/**
 * Displays a single vehicle in the inventory.
 */
const VehicleCard = ({
  vehicle,
  onPurchase,
  onEdit,
  onDelete,
  onRestock,
}) => {
  const { isAdmin } = useAuth();

  const outOfStock = vehicle.quantity <= 0;

  return (
    <article className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 transition duration-200 hover:-translate-y-1 hover:border-slate-700">

      {/* Vehicle visual area */}
      <div className="flex h-40 items-center justify-center bg-slate-800/60">
        <Car className="h-16 w-16 text-slate-600" />
      </div>

      <div className="p-5">

        {/* Category */}
        <div className="mb-3 flex items-center justify-between">
          <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-400">
            {vehicle.category}
          </span>

          <div
            className={`flex items-center gap-1 text-xs font-medium ${
              outOfStock
                ? "text-red-400"
                : "text-emerald-400"
            }`}
          >
            <Package className="h-3.5 w-3.5" />

            {outOfStock
              ? "Out of stock"
              : `${vehicle.quantity} in stock`}
          </div>
        </div>

        {/* Vehicle information */}
        <h2 className="text-xl font-bold text-white">
          {vehicle.make} {vehicle.model}
        </h2>

        <p className="mt-3 text-2xl font-bold text-white">
          ${Number(vehicle.price).toLocaleString()}
        </p>

        {/* Purchase */}
        <button
          disabled={outOfStock}
          onClick={() => onPurchase(vehicle)}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-slate-800 disabled:text-slate-500"
        >
          <ShoppingCart className="h-4 w-4" />

          {outOfStock
            ? "Out of Stock"
            : "Purchase"}
        </button>

        {/* Admin controls */}
        {isAdmin && (
          <div className="mt-4 grid grid-cols-3 gap-2 border-t border-slate-800 pt-4">

            <button
              onClick={() => onEdit(vehicle)}
              className="flex items-center justify-center gap-1 rounded-lg bg-slate-800 px-2 py-2 text-xs font-medium text-slate-300 transition hover:bg-slate-700"
            >
              <Pencil className="h-3.5 w-3.5" />
              Edit
            </button>

            <button
              onClick={() => onRestock(vehicle)}
              className="flex items-center justify-center gap-1 rounded-lg bg-slate-800 px-2 py-2 text-xs font-medium text-slate-300 transition hover:bg-slate-700"
            >
              <PackagePlus className="h-3.5 w-3.5" />
              Restock
            </button>

            <button
              onClick={() => onDelete(vehicle)}
              className="flex items-center justify-center gap-1 rounded-lg bg-red-500/10 px-2 py-2 text-xs font-medium text-red-400 transition hover:bg-red-500/20"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Delete
            </button>

          </div>
        )}

      </div>
    </article>
  );
};

export default VehicleCard;