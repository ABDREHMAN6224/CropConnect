import Image from "next/image";

export default function CartItem({
  imgSrc,
  productTitle,
  productPrice,
  productQty,
}) {
  return (
    <li className="flex py-6">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
        <Image
          src={imgSrc}
          width={384}
          height={384}
          alt="Image"
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3>{productTitle}</h3>
            <p className="ml-4">PKR {productPrice}</p>
          </div>
        </div>
        <div className="flex flex-1 items-end justify-between text-sm">
          <p className="text-gray-500">Qty {productQty}</p>

          <div className="flex">
            <button
              type="button"
              className="font-medium text-primary-600 hover:text-primary-500"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}
