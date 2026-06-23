export default function FiltersBar({ filters, onChange, categories, types }) {
  const set = (key) => (e) => onChange({ ...filters, [key]: e.target.value });

  const select = 'rounded-md border border-gray-300 px-2 py-2 text-sm bg-white';

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
      <select className={select} value={filters.category_id} onChange={set('category_id')}>
        <option value="">All categories</option>
        {categories.map((c) => (
          <option key={c.id} value={c.id}>{c.name}</option>
        ))}
      </select>

      <select className={select} value={filters.type} onChange={set('type')}>
        <option value="">All types</option>
        {types.map((t) => (
          <option key={t} value={t}>{t}</option>
        ))}
      </select>

      <select className={select} value={filters.is_free} onChange={set('is_free')}>
        <option value="">Free or Course</option>
        <option value="true">Free</option>
        <option value="false">Course</option>
      </select>

      <input
        type="number" step="0.1" min="0" max="5" placeholder="Min rating"
        className={select} value={filters.rating_min} onChange={set('rating_min')}
      />
      <input
        type="number" step="0.1" min="0" max="5" placeholder="Max rating"
        className={select} value={filters.rating_max} onChange={set('rating_max')}
      />
    </div>
  );
}