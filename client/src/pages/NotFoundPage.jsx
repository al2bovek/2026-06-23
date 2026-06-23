import { Link } from 'react-router';

export default function NotFoundPage() {
  return (
    <div className="text-center py-20">
      <h1 className="text-4xl font-bold text-gray-900">404</h1>
      <p className="text-gray-600 mt-2">Page not found.</p>
      <Link to="/" className="text-blue-600 hover:underline mt-4 inline-block">Go home</Link>
    </div>
  );
}