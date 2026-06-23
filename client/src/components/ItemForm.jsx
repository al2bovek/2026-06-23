import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

export default function ItemForm({ initial, categories, onSubmit, onCancel, submitting }) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: initial || {
      name: '', type: '', description: '', image_url: '',
      address: '', rating: 0, is_free: false, category_id: '',
    },
  });

  useEffect(() => {
    if (initial) reset(initial);
  }, [initial, reset]);

  const submit = (values) => {
    onSubmit({
      ...values,
      rating: Number(values.rating),
      category_id: Number(values.category_id),
      is_free: Boolean(values.is_free),
    });
  };

  const input = 'w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500';
  const label = 'block text-xs font-medium text-gray-700 mb-1';

  return (
    <form onSubmit={handleSubmit(submit)} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <div>
        <label className={label}>Name</label>
        <input className={input} {...register('name', { required: true })} />
        {errors.name && <p className="text-xs text-red-600 mt-1">Required</p>}
      </div>

      <div>
        <label className={label}>Type</label>
        <input className={input} placeholder="museum, park, castle..." {...register('type', { required: true })} />
        {errors.type && <p className="text-xs text-red-600 mt-1">Required</p>}
      </div>

      <div className="sm:col-span-2">
        <label className={label}>Description</label>
        <textarea rows={3} className={input} {...register('description')} />
      </div>

      <div>
        <label className={label}>Image URL</label>
        <input className={input} {...register('image_url')} />
      </div>

      <div>
        <label className={label}>Address</label>
        <input className={input} {...register('address')} />
      </div>

      <div>
        <label className={label}>Rating (0-5)</label>
        <input type="number" step="0.1" min="0" max="5" className={input} {...register('rating')} />
      </div>

      <div>
        <label className={label}>Category</label>
        <select className={input} {...register('category_id', { required: true })}>
          <option value="">-- choose --</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
        {errors.category_id && <p className="text-xs text-red-600 mt-1">Required</p>}
      </div>

      <div className="flex items-center gap-2 sm:col-span-2">
        <input id="is_free" type="checkbox" {...register('is_free')} />
        <label htmlFor="is_free" className="text-sm text-gray-700">Free</label>
      </div>

      <div className="sm:col-span-2 flex justify-end gap-2 pt-2">
        <button type="button" onClick={onCancel} className="px-3 py-2 rounded-md border border-gray-300 text-sm">
          Cancel
        </button>
        <button
          type="submit"
          disabled={submitting}
          className="px-4 py-2 rounded-md bg-gray-900 text-white text-sm hover:bg-gray-800 disabled:opacity-50"
        >
          {submitting ? 'Saving...' : 'Save'}
        </button>
      </div>
    </form>
  );
}