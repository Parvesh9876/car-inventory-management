import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-center text-white">
      <div>
        <p className="text-7xl font-bold text-blue-500">
          404
        </p>

        <h1 className="mt-5 text-3xl font-bold">
          Page not found
        </h1>

        <p className="mt-3 text-slate-400">
          The page you're looking for doesn't exist.
        </p>

        <Link
          to="/dashboard"
          className="mt-8 inline-block rounded-xl bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-500"
        >
          Return to dashboard
        </Link>
      </div>
    </div>
  );
};

export default NotFound;