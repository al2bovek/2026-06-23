import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import { ItemsApi } from '../api/items.api.js';

export default function ItemDetailsPage() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    ItemsApi.get(id)
      .then(setItem)
      .catch((err) => setError(err.response?.data?.message || 'Not found'));
  }, [id]);

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-700">{error}</p>
        <Link to="/" className="text-blue-600 hover:underline">← Back</Link>
      </div>
    );
  }

  if (!item) return <div className="text-center text-gray-500 py-10">Loading...</div>;

  return (
    <article className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      {item.image_url && (
        <img src={item.image_url} alt={item.name} className="w-full max-h-96 object-cover" />
      )}
      <div className="p-6 space-y-3">
        <Link to="/" className="text-sm text-blue-600 hover:underline">← Back to items</Link>
        <h1 className="text-2xl font-semibold text-gray-900">{item.name}</h1>
        <div className="flex flex-wrap gap-2 text-sm text-gray-600">
          <span className="px-2 py-0.5 rounded-full bg-gray-100 capitalize">{item.type}</span>
          <span>· {item.category_name}</span>
          <span>· ★ {Number(item.rating).toFixed(1)}</span>
          <span>· {item.is_free ? 'Free' : 'Course'}</span>
        </div>
        {item.address && (
          <p className="text-sm text-gray-600"><strong>Address:</strong> {item.address}</p>
        )}
        <p className="text-gray-800 whitespace-pre-line leading-relaxed">{item.description}</p>
      </div>
    </article>
  );
}