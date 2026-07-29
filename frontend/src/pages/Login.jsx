import { useState } from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";
import { Car, LogIn } from "lucide-react";

import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  /**
   * Keep React state synchronized with form fields.
   */
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  /**
   * Submit login credentials to backend.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      await login(formData);

      navigate("/dashboard");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to login. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-950">
      {/* Branding section */}
      <div className="hidden w-1/2 flex-col justify-between bg-slate-900 p-12 lg:flex">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-blue-600 p-3">
            <Car className="h-7 w-7 text-white" />
          </div>

          <div>
            <h1 className="text-xl font-bold text-white">
              AutoStock
            </h1>

            <p className="text-sm text-slate-400">
              Dealership Inventory
            </p>
          </div>
        </div>

        <div>
          <h2 className="max-w-lg text-5xl font-bold leading-tight text-white">
            Manage dealership inventory with confidence.
          </h2>

          <p className="mt-6 max-w-lg text-lg leading-8 text-slate-400">
            Search inventory, track stock, purchase vehicles
            and manage dealership operations from one
            dashboard.
          </p>
        </div>

        <p className="text-sm text-slate-500">
          Car Dealership Inventory System
        </p>
      </div>

      {/* Login section */}
      <div className="flex w-full items-center justify-center px-6 py-12 lg:w-1/2">
        <div className="w-full max-w-md">
          <div className="mb-10 lg:hidden">
            <div className="flex items-center gap-3">
              <Car className="h-8 w-8 text-blue-500" />

              <span className="text-xl font-bold text-white">
                AutoStock
              </span>
            </div>
          </div>

          <p className="font-medium text-blue-500">
            Welcome back
          </p>

          <h2 className="mt-2 text-4xl font-bold text-white">
            Sign in to your account
          </h2>

          <p className="mt-3 text-slate-400">
            Enter your credentials to access the inventory.
          </p>

          {error && (
            <div className="mt-6 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-5"
          >
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                Email address
              </label>

              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                autoComplete="email"
                required
                className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                Password
              </label>

              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                autoComplete="current-password"
                required
                className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <LogIn className="h-5 w-5" />

              {loading
                ? "Signing in..."
                : "Sign in"}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-400">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-blue-400 hover:text-blue-300"
            >
              Create account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;