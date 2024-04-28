import Link from 'next/link';

const ItemBox = ({ imageSrc, productName, price, id }) => {
  return (
    <div className="flex flex-col items-center justify-center bg-transparent ">
      <img src={imageSrc} alt={productName} className="w-49 h-49 object-contain" />
      <div className="text-center">
        <h2 className="text-md font-medium mt-2">{productName}</h2>
        <p className="text-sm mt-1">${price}</p>
      </div>
      <Link href={`/products/${id}`}>
        <p className="text-sm bg-white mb-8 hover:bg-gray-200 text-black py-1 px-3 mt-2 w-full rounded text-center border border-black">
          View Details
        </p>
      </Link>
    </div>
  );
};

export default ItemBox;