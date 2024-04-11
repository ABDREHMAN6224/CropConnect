import { FaTrash } from "react-icons/fa";

export default function ProductImage({ src, alt, onClick }) {
    return <div className="relative">
        <img src={src} alt={alt} className="w-24 h-24 object-cover rounded-md"/>
        <button className="absolute top-0 right-0 bg-white rounded-full p-1"
            onClick={onClick}
        >
            <FaTrash className="text-red-500"/>
        </button>
    </div>
}