// Home page for the application
'use client'
import Navbar from "@/components/Navbar";
import ProductTile from "@/components/ProductTile"
import { fetchCart } from "@/utility/fetchCart";
import { useEffect, useState } from "react";

const page = () => {
  const[products,setProducts]=useState([]);
  const [cartItems,setCartItems] = useState([]);
  const [triggerReload, setTriggerReload] = useState(true);
  const allProducts=async()=>{
      const response= await fetch(`https://ecommerce-profilefyi-backend.onrender.com/product/allProducts`,{
        method:'GET',
        headers:{'Content-Type': 'application/json'}
      })
      const result=await response.json();
      setProducts(result);
  }

  const getCartItems=async()=>{
    const userId = localStorage.getItem('userId');
    const fetchedCartItems = await fetchCart(userId);
    setCartItems(fetchedCartItems);
  }

  useEffect(()=>{
    allProducts();
    getCartItems();
  },[])

  useEffect(()=>{
    getCartItems();
  },[triggerReload]);

  const isPresentInCart=(productId)=>{
    return cartItems.filter((item) => item.productId === productId).length > 0;
  }

  const reloadHomePage=()=>{
    setTriggerReload(prevState => !prevState);
  }

  return (
    <div className="h-screen">
      <Navbar pageType='loggedIn' cartItemCount={cartItems.length}/>
      <div style={{ height: 'calc(100vh - 80px)' }} className="grid grid-cols-4 gap-10 p-5 overflow-auto box-border">
        {products.map((product)=>(
          <ProductTile
            key={product._id}
            id={product._id}
            image={product.image}
            title={product.name}
            price={product.salePrice}
            inCart={isPresentInCart(product._id)}
            reloadHomePage={reloadHomePage}
          />
        ))}
      </div>
    </div>
    
  )
}

export default page