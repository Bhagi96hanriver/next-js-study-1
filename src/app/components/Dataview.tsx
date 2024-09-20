'use client';

import React, { useRef } from 'react';
import { Student } from "@/types/userAuth/types"; // Import the Student type

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  listData: Student[]; // Array of objects to display
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, listData }) => {
    const modalRef = useRef<HTMLDivElement>(null);
  
    // Close the modal if clicked outside of the modal content
    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose(); // Call the close function if clicked outside
      }
    };
  
    if (!isOpen) return null; // Don't render the modal if it's not open
  
    return (
      <div
        className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50"
        onClick={handleOverlayClick} // Handle overlay click
      >
        <div
          ref={modalRef} // Reference the modal content div
          className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full h-[80vh] overflow-y-auto"
        >
          <h2 className="text-xl font-bold mb-4">List of Items</h2>
  
          <ul className="mb-4">
            {listData.length > 0 ? (
              listData.map((item) => (
                <li key={item.id} className="mb-2 border-b pb-2">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-gray-600">{item.body}</p> {/* Display body field */}
                </li>
              ))
            ) : (
              <li>No items available</li>
            )}
          </ul>
  
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
            onClick={onClose} // Close the modal on button click
          >
            Close
          </button>
        </div>
      </div>
    );
  };
  
  export default Modal;