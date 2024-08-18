// Home page for the application
'use client'
import Navbar from "@/components/Navbar";
import ProductTile from "@/components/ProductTile"
import { fetchCart } from "@/utility/fetchCart";
import { useEffect, useState } from "react";

// component for home page
const page = () => {
  const[products,setProducts]=useState([]);
  const [cartItems,setCartItems] = useState([]);
  const [triggerReload, setTriggerReload] = useState(true);

  // fetching all products using backend API
  const allProducts=async()=>{
    try {
      const response= await fetch(`https://ecommerce-profilefyi-backend.onrender.com/product/allProducts`,{
        method:'GET',
        headers:{'Content-Type': 'application/json'}
      })
      if(response.ok) {
        const result=await response.json();
        setProducts(result);
      } else {
        throw new Error('Network response was not ok')
      }
    } catch {
      alert('Error fetching products. Please try again later')
    }
  }

  // getting cart items so that we can send the item count to cart icon subscript
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

  // checks if a product is already present in cart, based on product id (unique id of each product stored in DB).
  const isPresentInCart=(productId)=>{
    return cartItems.filter((item) => item.productId === productId).length > 0;
  }

  // This can be used to trigger reload of the page so that we can update the cart count in icon
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