import React from "react";

const ConfirmModal = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onCancel}
      />
      <div className="relative bg-gray-800 p-6 rounded-xl w-[90%] max-w-sm">
        <h2 className="text-lg font-bold mb-4">{message}</h2>
        <div className="flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 rounded hover:bg-red-700 text-white"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
