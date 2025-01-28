import React from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/'); // Navigate to the home page
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-600 text-white">
      <div className="text-center">
        {/* Error Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-24 w-24 mx-auto mb-6 text-red-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>

        {/* Error Message */}
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Oops! Page Not Found</h2>
        <p className="text-lg mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>

        {/* Go Back Home Button */}
        <button
          onClick={handleGoHome}
          className="px-6 py-3 bg-white text-purple-600 font-semibold rounded-lg shadow-lg hover:bg-purple-50 transition duration-300"
        >
          Go Back Home
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;