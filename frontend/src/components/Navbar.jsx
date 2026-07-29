import {
  Car,
  LogOut,
  ShieldCheck,
  User,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

/**
 * Main application navigation bar.
 *
 * Displays the logged-in user's information and provides
 * the logout functionality.
 */
const Navbar = () => {
  const { user, isAdmin, logout } = useAuth();

  return (
    <nav className="border-b border-slate-800 bg-slate-900">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        {/* Application branding */}
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-blue-600 p-2">
            <Car className="h-6 w-6 text-white" />
          </div>

          <div>
            <h1 className="font-bold text-white">
              AutoStock
            </h1>

            <p className="text-xs text-slate-400">
              Dealership Inventory
            </p>
          </div>
        </div>

        {/* Logged-in user */}
        <div className="flex items-center gap-4">

          <div className="hidden text-right sm:block">
            <p className="text-sm font-medium text-white">
              {user?.name}
            </p>

            <div className="flex items-center justify-end gap-1 text-xs text-slate-400">
              {isAdmin ? (
                <ShieldCheck className="h-3 w-3" />
              ) : (
                <User className="h-3 w-3" />
              )}

              <span className="capitalize">
                {user?.role}
              </span>
            </div>
          </div>

          <button
            onClick={logout}
            className="flex items-center gap-2 rounded-lg border border-slate-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
          >
            <LogOut className="h-4 w-4" />

            <span className="hidden sm:inline">
              Logout
            </span>
          </button>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;