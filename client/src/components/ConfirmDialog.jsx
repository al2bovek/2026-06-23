export default function ConfirmDialog({ open, title, message, onConfirm, onCancel }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-sm w-full p-5">
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        <p className="text-sm text-gray-600 mt-2">{message}</p>
        <div className="mt-5 flex justify-end gap-2">
          <button onClick={onCancel} className="px-3 py-2 rounded-md border border-gray-300 text-sm">
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-3 py-2 rounded-md bg-red-600 text-white text-sm hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}