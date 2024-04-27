// components/QuantityButton.js

import React from 'react';

const QuantityButton = ({ quantity, increaseQuantity, decreaseQuantity }) => {
  return (
    <div className="flex items-center">
      <button className="text-gray-500 hover:text-gray-700 p-2" onClick={decreaseQuantity}>-</button>
      <span className="px-2 py-1">{quantity}</span>
      <button className="text-gray-500 hover:text-gray-700 focus:outline-none p-2" onClick={increaseQuantity}>+</button>
    </div>
  );
};

export default QuantityButton;
