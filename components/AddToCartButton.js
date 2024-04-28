import React from 'react';

const AddToCartButton = ({ onClick }) => {
  return (
    <button
      className="text-white hover:bg-green-900 focus:outline-none py-2 px-4 rounded mt-2"
      style={{ backgroundColor: '#2E5F2A', cursor: 'pointer', fontSize: '1.2rem' }}
      onClick={onClick}
    >
      Add to Cart
    </button>
  );
};

export default AddToCartButton;
