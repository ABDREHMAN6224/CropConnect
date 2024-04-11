"use client";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../../store/hooks";
import { BACKEND_URL } from "../../../utils/constants";
import NavBar from "../../../../components/NavBar";
import Rating from "../../../../components/Rating";
import { useRouter } from "next/navigation";
import Spinner from "../../../../components/Spinner";
import { useCart } from "../../../context/cartContext";

export default function SingleProduct({params}){
    const [product,setProduct] = useState({});
    const [loading,setLoading] = useState(false);
    const {token} = useAppSelector((state) => state.auth);
    const user = useAppSelector((state) => state.user);
    const {cart,addToCart, removeFromCart} = useCart();
    const [activeImage, setActiveImage] = useState(0);
    const [reviews, setReviews] = useState([])
    const router = useRouter();
    const dummyReviews = [
        {
            _id: "1",
            comment: "This is a dummy review",
            author: {
                name: "Dummy User",
                pic: "https://randomuser.me/api/portraits",
            },
            rating: 4,
            sales: 10,
            numReviews: 5,
        },
        {
            _id: "2",
            comment: "This is a dummy review",
            author:{
                name: "Dummy User",
                pic: "https://randomuser.me/api/portraits",
            },
            rating: 3.4,
            sales: 10,
            numReviews: 5,
        }
    ]

    useEffect(() => {
        const getProduct = async () => {
            setLoading(true);
            const response = await fetch(`${BACKEND_URL}/marketplace/${params.id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();
            if(response.ok){
                setProduct(data);
                console.log(data.reviews);
                setReviews(data.reviews);
            }else{
                console.log(data);
            }
            setLoading(false);
        }
        getProduct();
    }, []);
    
    return (
        <>
        
            <NavBar />
            {loading?
            <div className="w-screen h-screen flex align-items-center justify-center">
                <Spinner/>
            </div>
            :
            <div style={{display:"contents"}}>
            <section className="text-gray-600 body-font overflow-hidden">
                <div className="container px-5 py-24 mx-auto">
                    <div className="lg:w-4/5 mx-auto flex flex-wrap items-center">
                        <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
                            <div className="flex gap-2 items-center">
                            <h1 className="text-gray-900 text-3xl title-font font-medium mb-4 dark:text-white">
                                {product.name}</h1>                            
                            </div>
                            <div className="flex mb-4 border-b-2 border-primary-500">
                                <a className="flex-grow text-primary-700 py-2 text-lg px-1 dark:text-primary-200" href="#">
                                    Description
                                </a>
                                <span>
                                    <span className="text-gray-400 dark:text-gray-300">
                                        {product.reviews && product.reviews.length} Reviews
                                        &nbsp;|&nbsp;
                                        {product.sales} Sales
                                    </span>
                                </span>
                            </div>
                            <p className="leading-relaxed mb-4 dark:text-gray-300"
                            >{product.description }</p>
                            <div className="flex border-t border-gray-200 py-2">
                                <span className="text-gray-500 dark:text-gray-400">
                                    Category</span>
                                <span className="ml-auto text-gray-900 dark:text-gray-300">
                                    {product.category}</span>
                            </div>
                            <div className="flex border-t border-gray-200 py-2">
                                <span className="text-gray-500 dark:text-gray-400">
                                    Average Rating</span>
                                <span className="ml-auto text-gray-900 dark:text-gray-300">
                                    {product.averageRating}/5</span>
                            </div>
                            <div className="flex border-t border-b mb-6 border-gray-200 py-2">
                                <span className="text-gray-500 dark:text-gray-400">
                                    Price</span>
                                <span className="ml-auto text-gray-900 dark:text-gray-300">
                                    {product.price}PKR</span>
                            </div>
                            <div className="flex">
                            <div className="flex items-center">
                                <img alt="ecommerce" src={product.seller && product.seller.avatar} className="w-10 h-10 rounded-full flex-shrink-0 object-cover object-center" />
                                <span className="flex-grow pl-3">
                                    <h2 className="title-font font-medium text-gray-600 underline-offset-2 underline dark:text-gray-300 ">
                                        {product.seller && product.seller.name}</h2>
                                </span>

                            </div>                                
                            <div className="flex ml-auto gap-4">
                                {cart.find((item) => item._id === product._id)?
                                <button className="flex ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded" onClick={() => removeFromCart(product._id)}>Remove from Cart</button>
                                :
                                <button className="flex ml-auto text-white bg-primary-500 border-0 py-2 px-6 focus:outline-none hover:bg-primary-600 rounded"
                                    onClick={() => addToCart(product)}
                                >Add to Cart</button>
                                }
                                <button className="flex ml-auto text-white bg-primary-500 border-0 py-2 px-6 focus:outline-none hover:bg-primary-600 rounded"
                                    onClick={()=>{
                                        if(!cart.find((item) => item._id === product._id)){
                                            addToCart(product);
                                        }
                                        router.push("/marketplace/checkout/"+product._id)
                                    }}
                                >Buy Now</button>
                                </div>

                            </div>
                        </div>
                        <div className="flex flex-col lg:w-1/2 w-full lg:pl-10 lg:py-6 lg:border-l lg:border-gray-200 lg:border-t-0 lg:border-b-0 lg:mb-0 mb-6">
                            <h2 className="text-sm title-font text-gray-800 tracking-widest mb-3 underline text-center dark:text-gray-200">PHOTOS</h2>
                            <div className="flex justify-center overflow-hidden h-96">
                                <img alt="ecommerce" className="object-cover object-center rounded w-full h-full" src={product.images && product.images[activeImage]} />
                            </div>
                            <div className="flex mt-2 gap-2">
                                {product.images && product.images.map((image, index) => (
                                    <img key={index} alt="ecommerce" className={`object-cover object-center rounded w-24 h-24 ${index === activeImage ? "border-2 border-primary-500" : ""}`} src={image} onClick={() => setActiveImage(index)} />
                                ))}
                            </div>
                        </div>
                        

                    </div>
                </div>
            </section>

            {/* reviews section */}
                    <div className="h-1 bg-gray-200 rounded overflow-hidden my-8">
                    </div>
            <section className="text-gray-600 body-font">
            <h1 class="sm:text-5xl text-3xl mb-4 font-medium bg-clip-text text-transparent bg-gradient-to-r from-primary-200 to-primary-900 text-center ">
                Reviews
         </h1>
            
            {reviews.length < 1?
            <div className=" sm:w-3/4 sm:pl-6 mx-auto">
                <p className="leading-relaxed text-base">Reviews are not available for this product</p>
            </div>
            :
            <div className="container px-5 py-24 mx-auto">
                <div className="flex flex-col">
                    <div className="flex flex-wrap gap-18 flex-col py-6 mb-12">
                        <h2 className="sm:w-2/5 text-gray-900 font-medium title-font text-2xl mb-2 sm:mb-0">Customer Reviews</h2>
                        <div className="sm:w-3/4 sm:pl-6 mt-4">
                            {reviews.map((review) => (
                                <div key={review._id} className="p-4 border-2 border-gray-200 mb-4 rounded-lg">
                                    <div className="flex items-center">
                                        <img alt="testimonial" src={review.author?.avatar} className="w-12 h-12 rounded-full flex-shrink-0 object-cover object-center" />
                                        <span className="flex-grow pl-6">
                                            <h2 className="title-font font-medium text-gray-900">{review.author?.name}</h2>
                                            <p className="text-gray-500 flex"><Rating rating={review?.rating}/></p>
                                        </span>
                                    </div>
                                    <p className="leading-relaxed mt-4">{review.comment}</p>
                                </div>
                            ))}
                        </div>
                        
                    </div>
                </div>
            </div>
            }
            </section>

            <div className="h-1 bg-gray-200 rounded overflow-hidden my-8">
            </div>
            
            {/* navigate back to marketplace */}
            <div className="container mx-auto p-4">
                <button className="bg-gray-200 text-primary-600 py-2 px-4 rounded-lg w-full mt-4 hover:bg-gray-300" onClick={() => router.push("/marketplace")}>Back to Marketplace</button>
            </div>
            </div>
        }
        </>
    )
}

