"use client";
import { useState, useEffect } from "react";
import NavBar from "../../components/NavBar";
import Card from "/components/Card";
import {FaStore} from "react-icons/fa";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { getMarketplaces } from "../store/marketPlace/marketPlaceThunk";
import { useRouter } from "next/navigation";
import TextInput from "../../components/inputs/TextInput";
import { formatAmount } from "../utils/general_utils";
import AuthWrapper from "../AuthWrapper";
export default function MarketplacePage() {
  //   const [loading, setLoading] = useState(true);
  const products = useAppSelector(store=>store.marketPlace)
  const [filteredProducts, setFilteredProducts] = useState([])
  const [search, setSearch] = useState("");
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [categories, setCategories] = useState(["All"])
  const [filters,setFilters] = useState({
    sort: "newest",
    category: "All",
    price: 0,
    minPrice: 0,
    maxPrice: 0

  })

  const getUniqueCategories = () => {
    const categories = products.map(product=>product.category);
    return ["All",...new Set(categories)]
  }

  const getMinMaxPrice = () => {
    const prices = products.map(product=>product.price);
    return {
      minPrice: Math.min(...prices),
      maxPrice: Math.max(...prices)
  }}
  
  
  useEffect(() => {
    setLoading(true);
    dispatch(getMarketplaces());
    setFilteredProducts([...products]);
    setLoading(false);
  }, []);

  useEffect(() => {
    if(!products.length) return;
    setFilters({
      ...filters,
      ...getMinMaxPrice(),
      price: getMinMaxPrice().maxPrice
    })
    setCategories(getUniqueCategories());
  }, [products]);


  useEffect(() => {
    if(!products.length) return;
    let newProducts = [...products];
    if(filters.category !== "All"){
      newProducts = newProducts.filter(product=>product.category === filters.category)
    }
    if(filters.price > 0){
      newProducts = newProducts.filter(product=>product.price <= filters.price)
    }
    if(filters.sort === "newest"){
      newProducts = newProducts.sort((a,b)=>new Date(b.createdAt) - new Date(a.createdAt))
    }
    if(filters.sort === "oldest"){
      newProducts = newProducts.sort((a,b)=>new Date(a.createdAt) - new Date(b.createdAt))
    }
    if(filters.sort === "price-asc"){
      newProducts = newProducts.sort((a,b)=>a.price - b.price)
    }
    if(filters.sort === "price-desc"){
      newProducts = newProducts.sort((a,b)=>b.price - a.price)
    }
    if(filters.sort === "a-z"){
      newProducts = newProducts.sort((a,b)=>a.name.localeCompare(b.name))
    }
    if(filters.sort === "z-a"){
      newProducts = newProducts.sort((a,b)=>b.name.localeCompare(a.name));
    }
    setFilteredProducts(newProducts);
  }, [filters]);

  return (
    <AuthWrapper>
      <NavBar />
      <main className="dark:bg-gray-900 flex">
        <aside className="text-white p-4 sticky top-0 h-screen w-1/4 border-r border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800">
          {/* optiion to navigate to my store */}
          <div className="flex items-center">
            <FaStore className="mr-2 text-primary-900" />
            <a href="/marketplace/store" className="hover:underline text-primary-950">
              My Store
            </a>
          </div>
          <hr className="my-4" />

            <div className="mt-12 flex flex-col gap-3">
                <h3 className="text-2xl font-bold text-primary-950 underline underline-offset-4">Filters</h3>

                <div className="relative w-full mt-4 flex flex-col">
                    <h5 className="text-lg font-semibold text-primary-950">Sort</h5>
                    <select className="w-full  text-primary-800 py-2 px-4 rounded-lg mt-2 bg-gray-200 hover:bg-gray-200"
                      value={filters.sort}
                      onChange={(e)=>setFilters({...filters,sort:e.target.value})}
                    >
                        {["newest","oldest","price-asc","price-desc","a-z","z-a"].map(option=>{
                          return <option key={option} value={option}>{option}</option>
                        }
                        )}
                    </select>
                </div>

                <div className="relative w-full mt-6 flex flex-col">
                    <h5 className="text-lg font-semibold text-primary-950">Categories</h5>
                    <ul className="mt-2 pl-2">
                        {categories.map(category=>{
                          if(!category) return;

                          return <li key={category} className="hover:text-primary-800 text-primary-700">
                            <input type="radio" name="category" value={category} className="mr-2" 
                            onChange={(e)=>setFilters({...filters,category:e.target.value})}
                            checked={filters.category === category}
                            />
                            {category}
                          </li>
                          }
                        )}
                    </ul>
                </div>

                <div className="relative w-full mt-6 flex flex-col">
                    <h5 className="text-lg font-semibold text-primary-950">Price</h5>
                    <p className="text-sm my-2 text-primary-700">PKR {formatAmount(Number(filters.price))}</p>
                    <input type="range"  step="1" className="w-full"
                      value={filters.price}
                      min={filters.minPrice}
                      max={filters.maxPrice}
                      onChange={(e)=>setFilters({...filters,price:e.target.value})}
                    />
                </div>


    
                
                <button className="bg-red-400 text-white py-2 px-4 rounded-lg w-full  hover:bg-red-500 mt-8"
                  onClick={()=>{
                    setSearch("");
                    setFilters({
                    ...filters,
                    sort: "newest",
                    category: "All",
                    price: filters.maxPrice,
                  })}}
                >Clear</button>
            </div>

        </aside>

        <div className="container mx-auto p-4">
          <header className="flex justify-between items-center mb-5 flex-col sm:flex-row">
            <h1 className="text-3xl mt-4 mb-5">
              Marketplace
            <span className="text-gray-500 text-sm block mt-3">Found {products.length} {products.length > 1 ? "products" : "product"}
            </span>
            </h1>
            {/* no of products found */}
            <TextInput 
              placeholder="Search for products"
              value={search}
              onChange={(e)=>setSearch(e.target.value)}
            />
          </header>
          <div className="grid grid-cols-1 sm:grid-cols-1  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 mt-4" >
            {filteredProducts.filter(product=>product.name.toLowerCase().includes(search.toLowerCase())).map((product) => (
              <Card
                key={product._id}
                imgSrc={product.images[0]}
                productTitle={product.name}
                productPrice={product.price}
                productDesc={product.description}
                rating={product?.averageRating}
                product={product}
                onOpen={()=>{
                  router.push(`/marketplace/products/${product._id}`)
                }}
              />
            ))}
          </div>
        </div>
        
      </main>
    </AuthWrapper>
  );
}
