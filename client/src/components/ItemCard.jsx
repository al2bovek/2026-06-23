import { Link } from 'react-router';

export default function ItemCard({ item, canEdit, onEdit, onDelete }) {
  return (
    <article className="bg-white rounded-lg border border-gray-200 overflow-hidden flex flex-col">
      <div className="aspect-4/3 bg-gray-100 overflow-hidden">
        {item.image_url ? (
          <img
            src={item.image_url}
            alt={item.name}
            className="w-full h-full object-cover"
            onError={(e) => { e.currentTarget.style.visibility = 'hidden'; }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
            No image
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col flex-1 gap-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-gray-900">{item.name}</h3>
          <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 capitalize">
            {item.type}
          </span>
        </div>

        <div className="text-sm text-gray-600">
          {item.category_name} · ★ {Number(item.rating).toFixed(1)} ·{' '}
          {item.is_free ? 'Free' : 'Course'}
        </div>

        <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>

        <div className="mt-auto pt-3 flex items-center justify-between flex-wrap gap-2">
          <Link
            to={`/items/${item.id}`}
            className="text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            Read more →
          </Link>
          {canEdit && (
            <div className="flex gap-2">
              <button
                onClick={() => onEdit(item)}
                className="text-sm px-2 py-1 rounded border border-gray-300 hover:bg-gray-50"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(item)}
                className="text-sm px-2 py-1 rounded border border-red-300 text-red-700 hover:bg-red-50"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}