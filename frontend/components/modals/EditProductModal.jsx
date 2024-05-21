"use client";
import ProductImage from "../ProductImage";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../../app/utils/constants";
import { useAppSelector } from "../../app/store/hooks";
import  TextInput  from "../inputs/TextInput";

export default function EditProductModal(
    {
        product,
        setEditModalOpen,
        setProduct,
        onSave,
    }
) {
    const [images, setImages] = useState(product.images);
    const [title, setTitle] = useState(product.name);
    const [description, setDescription] = useState(product.description);
    const [price, setPrice] = useState(product.price);
    const [dataChanged, setDataChanged] = useState(false);
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [stock, setStock] = useState(product?.stock);

    const {token}=useAppSelector((state)=>state.auth);

    const handleDeleteImage = (index) => {
        const newImages = [...images];
        newImages.splice(index, 1);
        setImages(newImages);
    }

    const handleSubmit = (event) => {
        event.preventDefault()
    }

    const handleCancel = () => {
        setEditModalOpen(false);
    }

    const handleSave =async () => {
        setLoading(true);
        const formData = new FormData();
        formData.append("name", title);
        formData.append("description", description);
        formData.append("price", price);
        formData.append("stock", stock);
        for(let i=0;i<files.length;i++){
            formData.append("images",files[i]);
        }

        const response = await fetch(`${BACKEND_URL}/marketplace/${product._id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        });
        const data = await response.json();
        if(response.ok){
            setLoading(false);
            setProduct(data);
            setEditModalOpen(false);
            onSave();
        }


    }

    useEffect(() => {
        let changed = false;
        if (title !== product.name || description !== product.description || price !== product.price) {
            changed = true;
        }
        if (images.length !== product.images.length) {
            changed = true;
        } else {
            for (let i = 0; i < images.length; i++) {
                if (images[i] !== product.images[i]) {
                    changed = true;
                    break;
                }
            }
        }
        if(stock!==product.stock){
            changed=true;
        }
        if(price<0 || stock<1 || title.length<=3 || description.length<5){
            changed = false;
        }

        setDataChanged(changed);
    }, [images, title, description, price,stock]);

    return (
        <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                    <div className="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                <h3 className="text-lg font-bold leading-6 text-gray-900 dark:text-white" id="modal-headline">
                                    Edit Product
                                </h3>
                                <hr className="my-4" />
                                <div className="mt-2">
                                    <form action="#" method="POST" onSubmit={handleSubmit}>
                                        <div className="grid grid-cols-1 gap-6">
                                            <div>
                                                <TextInput
                                                    label="Title"
                                                    type="text"
                                                    name="title"
                                                    value={title}
                                                    onChange={(event) => setTitle(event.target.value)}
                                                    error={title.length<3 ? "Title must be at least 3 characters" : ""}
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                    Description
                                                </label>
                                                <textarea id="description" name="description" value={description} rows="3" className="mt-1 p-2 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    onChange={(event) => setDescription(event.target.value)}
                                                >
                                                </textarea>
                                                    
                                            </div>
                                            <div>
                                                <TextInput
                                                    label="Price"
                                                    type="number"
                                                    name="price"
                                                    value={price}
                                                    onChange={(event) => setPrice(event.target.value)}
                                                    error={price<0 ? "Price cannot be negative" : ""}
                                                />
                                            </div>
                                            <div>
                                                <TextInput
                                                    label="Stock"
                                                    type="number"
                                                    name="stock"
                                                    value={stock}
                                                    onChange={(event) => setStock(event.target.value)}
                                                    error={stock<0 ? "Stock cannot be negative" : ""}
                                                />
                                                </div>
                                            <div>
                                                <label htmlFor="image" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                    Images
                                                </label>
                                                {/* show all images */}
                                                <div className="flex gap-4 items-center overflow-x-auto">
                                                    {/* image on hover with delete icon */}
                                                    {images.map((image, index) => {
                                                        return <ProductImage key={index} src={image} alt="Product Image" onClick={() => handleDeleteImage(index)} />
                                                    })}
                                                 
                                                </div>
                                                {images.length<5 &&
                                                    <div className="mt-4">
                                                        <label htmlFor="file-upload" className="relative cursor-pointer bg-primary-600 rounded-md font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 p-2">
                                                            <span>Upload files</span>
                                                            <input id="file-upload" name="file-upload" type="file" className="sr-only" multiple
                                                                onChange={(event) => {
                                                                    const files = event.target.files;
                                                                    setFiles(f=>[...f,...files]);
                                                                    const newImages = [...images];
                                                                    for (let i = 0; i < files.length ; i++) {
                                                                        newImages.push(URL.createObjectURL(files[i]));
                                                                    }
                                                                    setImages(newImages.slice(0, 5));
                                                                }}
                                                            />
                                                        </label>
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50"
                            onClick={handleSave}
                            disabled={!dataChanged || loading}
                        >
                            {loading ? "Saving..." : "Save"}
                        </button>
                        <button type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
