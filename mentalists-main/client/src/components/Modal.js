import React from 'react';

const Modal = ({ title, children, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40" onClick={onClose}>
      <div
        className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-6 relative"
        style={{ minWidth: 320, maxWidth: 480 }}
        onClick={e => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 text-[#a53f3f] hover:text-[#3a0303] text-2xl font-bold focus:outline-none"
          onClick={onClose}
          aria-label="Close modal"
        >
          &times;
        </button>
        {title && <h2 className="text-xl font-bold mb-4 text-[#a53f3f]">{title}</h2>}
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal; 