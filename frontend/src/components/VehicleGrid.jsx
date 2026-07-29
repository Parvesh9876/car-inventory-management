import VehicleCard from "./VehicleCard";

/**
 * Displays the vehicle collection in a responsive grid.
 */
const VehicleGrid = ({
  vehicles,
  onPurchase,
  onEdit,
  onDelete,
  onRestock,
}) => {
  if (vehicles.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-700 py-20 text-center">
        <h3 className="text-lg font-semibold text-white">
          No vehicles found
        </h3>

        <p className="mt-2 text-sm text-slate-400">
          Try changing your search or filters.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {vehicles.map((vehicle) => (
        <VehicleCard
          key={vehicle._id}
          vehicle={vehicle}
          onPurchase={onPurchase}
          onEdit={onEdit}
          onDelete={onDelete}
          onRestock={onRestock}
        />
      ))}
    </div>
  );
};

export default VehicleGrid;