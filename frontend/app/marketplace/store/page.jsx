"use client"
import Link from "next/link";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import NavBar from "../../../components/NavBar";
import Card from "/components/Card";
import { BACKEND_URL } from "../../utils/constants";
import Spinner from "/components/Spinner";
import TextInput from "../../../components/inputs/TextInput";

export default function Store(){
    const [myProducts, setMyProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const {token}=useAppSelector((state)=>state.auth);
    const [search, setSearch] = useState("");
    
    const getMyMarketplaces = async () => {
        setLoading(true);
        const response = await fetch(`${BACKEND_URL}/marketplace/my/marketplace`, {
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            },
        });
        const data = await response.json();
        if(response.ok){
            setMyProducts(data);
        }else{
            setError(true);
        }
        setLoading(false);

    }

    const handleDelete = async (id) => {
        setLoading(true);
        const response = await fetch(`${BACKEND_URL}/marketplace/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await response.json();
        if(response.ok){
            toast.success("Product deleted successfully");
            setMyProducts(myProducts.filter((product) => product._id !== id));
        }else{
            console.log(data);
            toast.error("Error deleting product");
        }
        setLoading(false);
    }
    const handleEdit = () => {}


    useEffect(() => {
        getMyMarketplaces();
    }, []);

    return (
        <>
        <NavBar />
        {/* my products section */}
        <main className="dark:bg-gray-900 flex">
        
            <div className="flex-1 p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">My Store</h1>

                    <TextInput
                        type="text"
                        name="search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search"
                    />

                    <Link href="/marketplace/create">
                        <span className="bg-primary-600 text-white px-4 py-2 rounded-lg">Add Product</span>
                    </Link>
                </div>
                <hr className="my-4" />
                {loading && !error &&
                    <div className="w-full h-full flex items-center justify-center">
                        <Spinner/>
                    </div>
                }
                {error &&
                    <div className="w-full h-full flex items-center justify-center">
                        <h1 className="text-xl text-red-500">Error fetching your products</h1>
                    </div>
                }
                {!loading && !error &&
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4" >
                        {myProducts.filter((product) => product.name.toLowerCase().includes(search.toLowerCase())).map((product) => (
                            <Card key={product._id} 
                            imgSrc={product.images[0]}
                            productTitle={product.name}
                            productPrice={product.price}
                            productDesc={product.description}
                            rating={product?.averageRating || 0}
                            admin={true} 
                            product={product}
                            sold={product.status === "sold" ? true : false}
                            handleDelete={handleDelete}
                            handleEdit={handleEdit}
                            onSave={getMyMarketplaces}
                            handleAvailable={(id)=>{
                                setMyProducts(myProducts.map((product)=>{
                                    if(product._id === id){
                                        product.status = "active";
                                    }
                                    return product;
                                }))
                            }}
                            />
                        ))}
                    </div>
                }
            </div>
            </main>
            <ToastContainer />
        </>
    )
    
}