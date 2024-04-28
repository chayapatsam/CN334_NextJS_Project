import React from 'react';

const QuantityButton = ({ quantity, increaseQuantity, decreaseQuantity }) => {
  return (
    <div className="flex items-center bg-white w-10 bd ">
      <button className="text-gray-500 hover:text-gray-700 p-2 " onClick={decreaseQuantity}>-</button>
      <span className="p-2 bg-white ">{quantity}</span>
      <button className="text-gray-500 hover:text-gray-700 focus:outline-none p-2 bg-white w-10 " onClick={increaseQuantity}>+</button>
    </div>
  );
};

export default QuantityButton;
