import { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';

import SearchBar from '../components/SearchBar.jsx';
import FiltersBar from '../components/FiltersBar.jsx';
import ItemCard from '../components/ItemCard.jsx';
import ItemForm from '../components/ItemForm.jsx';
import ConfirmDialog from '../components/ConfirmDialog.jsx';

import { ItemsApi } from '../api/items.api.js';
import { CategoriesApi } from '../api/categories.api.js';
import { useAuth } from '../context/AuthContext.jsx';
import { useDebounce } from '../hooks/useDebounce.js';

const emptyFilters = {
  category_id: '', type: '', is_free: '', rating_min: '', rating_max: '',
};
export default function HomePage() {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState(emptyFilters);
  const debouncedSearch = useDebounce(search, 350);

  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const loadCategories = () => CategoriesApi.list().then(setCategories);

  const loadItems = () => {
    const params = { q: debouncedSearch, ...filters };
    Object.keys(params).forEach((k) => params[k] === '' && delete params[k]);
    return ItemsApi.list(params).then(setItems);
  };

  useEffect(() => { loadCategories(); }, []);
  useEffect(() => { loadItems(); /* eslint-disable-next-line */ }, [debouncedSearch, filters]);

  const types = useMemo(
    () => [...new Set(items.map((i) => i.type))].sort(),
    [items]
  );

  const openCreate = () => { setEditing(null); setShowForm(true); };
  const openEdit   = (item) => { setEditing(item); setShowForm(true); };

  const handleSubmit = async (values) => {
    setSubmitting(true);
    try {
      if (editing) {
        await ItemsApi.update(editing.id, values);
        toast.success('Item updated');
      } else {
        await ItemsApi.create(values);
        toast.success('Item created');
      }
      setShowForm(false);
      setEditing(null);
      await loadItems();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Save failed');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    try {
      await ItemsApi.remove(confirmDelete.id);
      toast.success('Item deleted');
      setConfirmDelete(null);
      await loadItems();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Delete failed');
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h1 className="text-2xl font-semibold text-gray-900">Items</h1>
        {user && (
          <button
            onClick={openCreate}
            className="px-4 py-2 rounded-md bg-gray-900 text-white text-sm hover:bg-gray-800"
          >
            + New item
          </button>
        )}
      </div>

      <div className="space-y-3">
        <SearchBar value={search} onChange={setSearch} />
        <FiltersBar
          filters={filters}
          onChange={setFilters}
          categories={categories}
          types={types}
        />
        {Object.values(filters).some(Boolean) && (
          <button
            onClick={() => setFilters(emptyFilters)}
            className="text-xs text-blue-600 hover:underline"
          >
            Clear filters
          </button>
        )}
      </div>

      {showForm && (
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-3">
            {editing ? 'Edit item' : 'New item'}
          </h2>
          <ItemForm
            initial={editing}
            categories={categories}
            onSubmit={handleSubmit}
            onCancel={() => { setShowForm(false); setEditing(null); }}
            submitting={submitting}
          />
        </div>
      )}

      {items.length === 0 ? (
        <div className="text-center text-gray-500 py-10">No items found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              canEdit={!!user}
              onEdit={openEdit}
              onDelete={(i) => setConfirmDelete(i)}
            />
          ))}
        </div>
      )}

      <ConfirmDialog
        open={!!confirmDelete}
        title="Delete item?"
        message={`This will remove "${confirmDelete?.name}".`}
        onConfirm={handleDelete}
        onCancel={() => setConfirmDelete(null)}
      />
    </div>
  );
}