'use client'
import Navbar from '@/components/Navbar'
import CartItem from '@/components/CartItem'
import { useEffect, useState } from 'react'

// component for cart page
const page = () => {
  const [cartProducts, setCartProducts] = useState([]);
  const [triggerReload,setTriggerReload] = useState(true);
  const [grandTotal,setGrandTotal] = useState(0);
  const [couponCode,setCouponCode]=useState('');
  const [afterDiscount,setAfterDiscount] = useState(0);

  // fetching cart products
  const fetchCartProducts=async()=>{
    try {
      const userId=localStorage.getItem('userId');
      const response = await fetch(`https://ecommerce-profilefyi-backend.onrender.com/cart/cartProducts/${userId}`);
      if(response.ok) {
        const result = await response.json();
        setCartProducts(result);
      } else {
        throw new Error(`Network response was not ok`);
      }
    } catch {
      alert('Error fetching cart items. Please try again later.')
    }
  }

  // calculating grand total as summation of cost of each item* quantity
  const calculateGrandTotal=()=> {
    let total = 0;
    cartProducts.forEach(product => {
      total += product.price*product.quantity;
    });
    setGrandTotal(total);
  }

  // calculating the final amount after discount, currently supporting two coupon codes.
  const checkDiscount=()=>{
    if(!couponCode) {
      setAfterDiscount(grandTotal);
    } else if(couponCode.toLocaleLowerCase() === 'percent10') {
      const discountedValue = grandTotal*0.9;
      setAfterDiscount(discountedValue);
    } else if(couponCode.toLocaleLowerCase() === 'off10') {
      const discountedValue = grandTotal < 10 ? 0 :grandTotal-10;
      setAfterDiscount(discountedValue);
    } else {
      setAfterDiscount(grandTotal);
    }
  }

  useEffect(()=>{
    checkDiscount();
  },[couponCode,grandTotal]);

  useEffect(()=>{
    fetchCartProducts();
  },[triggerReload]);

  useEffect(()=>{
    calculateGrandTotal();
  },[cartProducts])

  const reloadCartPage=()=>{
    setTriggerReload(prevState => !prevState);
  }

  // Just clearing off the cart upon place order. Not actually storing the order details anywhere.
  const handlePlaceOrder=async()=>{
    try {
      const userId=localStorage.getItem('userId');
      const response = await fetch(`https://ecommerce-profilefyi-backend.onrender.com/cart/update/${userId}`,{
        method:'GET',
        headers:{'Content-Type': 'application/json'} ,
        body: JSON.stringify({items: []})
      });
      if (!response.ok) {
        throw new Error(`Network response was not ok`);
      }
      reloadCartPage();
    } catch {
      alert('There was an issue placing your order. Please try again later.');
    }
  }
  
  return (
    <div className="h-screen">
        <Navbar pageType='loggedIn' cartItemCount={cartProducts.length}/>
        {cartProducts.length===0 && <div>Cart is empty</div>}
        <div className='flex'>
          <div style={{ height: 'calc(100vh - 80px)' }} className='overflow-auto p-4 flex flex-col gap-4 w-1/2'>
            {cartProducts.map((cartProduct)=>(
              <CartItem
                key={cartProduct._id}
                id={cartProduct._id}
                image={cartProduct.image}
                title={cartProduct.productName}
                price={cartProduct.price}
                quantity={cartProduct.quantity}
                reloadCartPage={reloadCartPage}
              />
            ))}
          </div>
          {cartProducts.length > 0 &&
            <div className='w-1/2 flex flex-col gap-2 justify-center items-center'>
              <div>Grand Total: &#8377;{grandTotal.toFixed(2)}</div>
              <label htmlFor="couponCode" className='text-gray-700 font-semibold'>Coupon Code</label>
              <input
                type="text"
                id="couponCode"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className='border border-gray-300 rounded-md p-2 w-48'
              />
              <div>After discount: &#8377;{afterDiscount.toFixed(2)}</div>
              <button
                className='bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded w-48'
                onClick={() => handlePlaceOrder()}
              >Place Order</button>
            </div>
          }
       </div>
    </div>
  )
}

export default page