import React from 'react';
import { BsPlusCircle } from 'react-icons/bs';

const AddSubtaskButton = ({ onClick }) => {
  return (
    <button onClick={onClick} className="text-blue-500 hover:text-green-600 mr-2 transition-colors ease-in-out duration-300">
      <BsPlusCircle size={22} />
    </button>
  );
};

export default AddSubtaskButton;
