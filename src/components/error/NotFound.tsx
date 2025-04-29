import { Link } from 'react-router-dom';
import { HomeIcon, ArrowLeft } from 'lucide-react';


export function NotFound() {
  const nav = '/users';

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-blue-600">404</h1>
        <h2 className="mt-4 text-3xl font-semibold text-gray-900">Page not found</h2>
        <p className="mt-2 text-lg text-gray-600">Sorry, we couldn't find the page you're looking for.</p>
        
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to={nav}
            className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <HomeIcon className="h-4 w-4" />
            Back to Users
          </Link>
          <button
            onClick={() => window.history.back()}
            className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-md border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}