import { Link, useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-5 text-center">
      <h1 className="text-9xl font-bold text-green-600">404</h1>
      <h2 className="text-3xl font-semibold mt-4 text-gray-800">Oops! Something went wrong</h2>
      <p className="text-gray-600 mt-2 mb-8 max-w-md">
        {error?.statusText || error?.message || "The page you are looking for doesn't exist or a server error occurred."}
      </p>
      <Link 
        to="/" 
        className="px-8 py-3 bg-green-600 text-white rounded-full font-medium hover:bg-green-700 transition-all shadow-lg"
      >Back to Home
      </Link>
    </div>
  );
};

export default ErrorPage;