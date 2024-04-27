// // components/ItemBox.js
import Link from "next/link";

// const ItemBox = ({ imageSrc, productName, onClick }) => {
//   return (
//     <div className="border border-gray-300 rounded p-4">
//       <img src={imageSrc} alt={productName} className="w-full h-auto mb-4" />
//       <p className="text-lg font-semibold mb-2">{productName}</p>
//       <Link href={`/products/${productName}`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
//           View Details
//       </Link>
//     </div>
//   );
// };

// export default ItemBox;

// components/ItemBox.js
const ItemBox = ({ imageSrc, productName, id }) => {
    return (
      <div className="ml-10 mr-10">
        <div className="bg-[#E2E3E2] p-4 shadow-md w-auto h-auto mx-3 my-3">
          <div className="flex flex-col items-center justify-center">
            <img src={imageSrc} alt={productName} className="w-auto h-auto object-contain" />
            <p className="text-center mt-2">{productName}</p>
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
  