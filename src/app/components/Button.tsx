'use client';

import React from 'react';

interface ButtonProps {
  name: string;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ name, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
    >
      {name}
    </button>
  );
};

export default Button;
