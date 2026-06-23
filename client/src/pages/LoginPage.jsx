import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext.jsx';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async (values) => {
    try {
      await login(values);
      toast.success('Welcome back');
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white border border-gray-200 rounded-lg p-6">
      <h1 className="text-xl font-semibold text-gray-900 mb-4">Log in</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <div>
          <label className="block text-sm text-gray-700 mb-1">Email</label>
          <input
            type="email"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
            {...register('email', { required: true })}
          />
          {errors.email && <p className="text-xs text-red-600 mt-1">Email is required</p>}
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1">Password</label>
          <input
            type="password"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
            {...register('password', { required: true })}
          />
          {errors.password && <p className="text-xs text-red-600 mt-1">Password is required</p>}
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-4 py-2 rounded-md bg-gray-900 text-white text-sm hover:bg-gray-800 disabled:opacity-50"
        >
          {isSubmitting ? 'Signing in...' : 'Log in'}
        </button>
      </form>
      <p className="text-sm text-gray-600 mt-4">
        No account? <Link to="/register" className="text-blue-600 hover:underline">Register</Link>
      </p>
    </div>
  );
}