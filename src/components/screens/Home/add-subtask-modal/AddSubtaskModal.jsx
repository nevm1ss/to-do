import React from 'react';

const AddSubtaskModal = ({ 
  subtaskData, 
  onSubmit, 
  onCancel, 
  onChange 
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-gray-800 p-6 rounded-lg w-96">
        <form onSubmit={onSubmit}>
          <input
            type="text"
            value={subtaskData.title}
            onChange={onChange}
            placeholder="Enter subtask title"
            className="bg-gray-700 text-white p-2 rounded w-full mb-4"
            autoFocus
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-600 px-4 py-2 rounded hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSubtaskModal;