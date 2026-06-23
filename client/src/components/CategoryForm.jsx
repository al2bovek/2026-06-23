import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

export default function CategoryForm({ initial, onSubmit, onCancel, submitting }) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: initial || { name: '' },
  });

  useEffect(() => {
    if (initial) reset(initial);
  }, [initial, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col sm:flex-row gap-2 items-start">
      <div className="flex-1 w-full">
        <input
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Category name"
          {...register('name', { required: true, maxLength: 120 })}
        />
        {errors.name && <p className="text-xs text-red-600 mt-1">Name is required</p>}
      </div>
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={submitting}
          className="px-4 py-2 rounded-md bg-gray-900 text-white text-sm hover:bg-gray-800 disabled:opacity-50"
        >
          Save
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} className="px-3 py-2 rounded-md border border-gray-300 text-sm">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}