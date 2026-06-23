import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import CategoryForm from '../components/CategoryForm.jsx';
import ConfirmDialog from '../components/ConfirmDialog.jsx';
import { CategoriesApi } from '../api/categories.api.js';

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [editing, setEditing] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const load = () => CategoriesApi.list().then(setCategories);

  useEffect(() => { load(); }, []);

  const handleSubmit = async (values) => {
    setSubmitting(true);
    try {
      if (editing) {
        await CategoriesApi.update(editing.id, values);
        toast.success('Category updated');
      } else {
        await CategoriesApi.create(values);
        toast.success('Category created');
      }
      setEditing(null);
      await load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Save failed');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    try {
      await CategoriesApi.remove(confirmDelete.id);
      toast.success('Category deleted');
      setConfirmDelete(null);
      await load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Delete failed');
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Categories</h1>

      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h2 className="text-sm font-semibold text-gray-700 mb-3">
          {editing ? `Edit "${editing.name}"` : 'Add category'}
        </h2>
        <CategoryForm
          initial={editing}
          onSubmit={handleSubmit}
          onCancel={editing ? () => setEditing(null) : null}
          submitting={submitting}
        />
      </div>

      <ul className="bg-white border border-gray-200 rounded-lg divide-y">
        {categories.length === 0 && (
          <li className="p-4 text-sm text-gray-500">No categories yet.</li>
        )}
        {categories.map((c) => (
          <li key={c.id} className="p-3 flex items-center justify-between">
            <span className="text-gray-800">{c.name}</span>
            <div className="flex gap-2">
              <button
                onClick={() => setEditing(c)}
                className="text-sm px-2 py-1 rounded border border-gray-300 hover:bg-gray-50"
              >
                Edit
              </button>
              <button
                onClick={() => setConfirmDelete(c)}
                className="text-sm px-2 py-1 rounded border border-red-300 text-red-700 hover:bg-red-50"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      <ConfirmDialog
        open={!!confirmDelete}
        title="Delete category?"
        message={`This will remove "${confirmDelete?.name}" and all its items.`}
        onConfirm={handleDelete}
        onCancel={() => setConfirmDelete(null)}
      />
    </div>
  );
}