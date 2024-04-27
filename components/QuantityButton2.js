// components/QuantityButton2.js

import React from 'react';

export default function QuantityButton2({ quantity, onIncrease, onDecrease }) {
  return (
    <div className="flex items-center">
      <button className="bg-gray-200 px-2 py-1 rounded-l" onClick={onDecrease}>-</button>
      <span className="px-2">{quantity}</span>
      <button className="bg-gray-200 px-2 py-1 rounded-r" onClick={onIncrease}>+</button>
    </div>
  );
}
