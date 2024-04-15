
import React from 'react';
import { Link } from 'react-router-dom';

function ErrorPage({ message = 'Unauthorized Access', description = 'You do not have permission to view this page.' }) {
  return (
    <div className='bg-gradient from-white to-blue-500 shadow-xl'>
    <div className="flex flex-col items-center justify-center h-screen  text-center">
      <h1 className="text-4xl font-bold text-red-600 mb-4">{message}</h1>
      <p className="text-lg text-red-500 mb-6">{description}</p>
      <Link to="/" className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-700">
        Go Home
      </Link>
    </div>
    </div>
  );
}

export default ErrorPage;
