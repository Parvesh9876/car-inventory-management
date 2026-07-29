import { Search, RotateCcw } from "lucide-react";

/**
 * SearchFilters
 *
 * Allows users to search vehicles by make/model and
 * filter by category and price range.
 */
const SearchFilters = ({
  filters,
  onChange,
  onSearch,
  onReset,
}) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-8 rounded-2xl border border-slate-800 bg-slate-900 p-5"
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">

        {/* Make / Model Search */}
        <div className="lg:col-span-2">
          <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-slate-400">
            Search
          </label>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />

            <input
              type="text"
              name="search"
              value={filters.search}
              onChange={onChange}
              placeholder="Toyota, Fortuner..."
              className="w-full rounded-xl border border-slate-700 bg-slate-950 py-3 pl-10 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Category */}
        <div>
          <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-slate-400">
            Category
          </label>

          <select
            name="category"
            value={filters.category}
            onChange={onChange}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-blue-500"
          >
            <option value="">All categories</option>
            <option value="SUV">SUV</option>
            <option value="Sedan">Sedan</option>
            <option value="Hatchback">Hatchback</option>
            <option value="Truck">Truck</option>
            <option value="Coupe">Coupe</option>
          </select>
        </div>

        {/* Minimum Price */}
        <div>
          <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-slate-400">
            Min Price
          </label>

          <input
            type="number"
            name="minPrice"
            min="0"
            value={filters.minPrice}
            onChange={onChange}
            placeholder="$0"
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-blue-500"
          />
        </div>

        {/* Maximum Price */}
        <div>
          <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-slate-400">
            Max Price
          </label>

          <input
            type="number"
            name="maxPrice"
            min="0"
            value={filters.maxPrice}
            onChange={onChange}
            placeholder="$100,000"
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-blue-500"
          />
        </div>

      </div>

      <div className="mt-4 flex justify-end gap-3">
        <button
          type="button"
          onClick={onReset}
          className="flex items-center gap-2 rounded-xl border border-slate-700 px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-slate-800"
        >
          <RotateCcw className="h-4 w-4" />
          Reset
        </button>

        <button
          type="submit"
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500"
        >
          <Search className="h-4 w-4" />
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchFilters;