import Link from "next/link";

const ItemBox = ({ imageSrc, productName, id, price }) => {
  return (
    <div className="ml-10 mr-10">
      <div className="bg-[#E2E3E2] p-4 shadow-md w-auto h-auto mx-3 my-3">
        <div className="flex flex-col items-center justify-center">
          <img src={imageSrc} alt={productName} className="w-auto h-auto object-contain" />
          <p className="text-center mt-2">{productName}</p>
          <p className="text-center mt-2">{price}</p>
          <div className="mt-2">
            <Link href={`/products/${id}`} className="bg-white hover:bg-gray-200 text-black font-regular py-2 px-20 rounded border border-black inline-block">
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemBox;
