import { Link, useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext.jsx';
import { toast } from 'react-toastify';

export default function Navbar() {
  const { user, logout, update, remove } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    toast.success('Logged out');
    navigate('/');
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete your account? This cannot be undone.')) return;

    await remove();
    toast.success('Account deleted');
    navigate('/');
  };

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between flex-wrap gap-3">
        <Link to="/" className="text-lg font-semibold text-gray-900">
          App Manager
        </Link>

        <nav className="flex items-center gap-3 text-sm">
          <Link to="/" className="text-gray-700 hover:text-gray-900">Items</Link>
          {user && (
            <Link to="/categories" className="text-gray-700 hover:text-gray-900">
              Categories
            </Link>
          )}

          {user ? (
            <>
              <span className="text-gray-500 hidden sm:inline">{user.email}</span>
                  <Link
                to="/update"
                className="text-gray-700 hover:text-gray-900"
              >
                Update
              </Link>
              <button
                onClick={handleDelete}
                className="text-red-600 hover:text-red-800"
              >
                Delete
              </button>
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 rounded-md bg-gray-900 text-white hover:bg-gray-800"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-700 hover:text-gray-900">Login</Link>
              <Link
                to="/register"
                className="px-3 py-1.5 rounded-md bg-gray-900 text-white hover:bg-gray-800"
              >
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}