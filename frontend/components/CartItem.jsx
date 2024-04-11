import Image from "next/image";

export default function CartItem({
  imgSrc,
  productTitle,
  productPrice,
  onRemove,
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
          <div className="flex flex-col justify-between items-start text-base font-medium text-gray-900 gap-2" >
            <h3>{productTitle}</h3>
            <p className="">PKR {productPrice}</p>
          </div>
        </div>
        <div className="flex flex-1 items-end justify-between text-sm">
          <div className="flex">
            <button
              type="button"
              className="font-medium text-primary-600 hover:text-primary-500" onClick={onRemove}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}
