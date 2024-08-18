import { updateCart } from "@/utility/updateCart"

const CartItem = ({image,title,price,quantity,id,reloadCartPage}) => {

  // Whenever there is a change in quantity of a cart item, we need to update cart.
  const handleChange=async(quantityToAdd)=>{
    const userId=localStorage.getItem('userId')
    await updateCart(userId,id,quantityToAdd); // Using utility function to update cart
    reloadCartPage(); // This is so that cart page could be reloaded so that quantities, items and cart icon count could be updated
  }
  
  return (
    <div className='p-4 w-full bg-stone-100 rounded-md'>
      <div className='flex flex-row gap-5'>
        <div className='w-1/4 flex'>
          <img className='object-contain justify-self-center' src={image} alt='cart-item-image' />
        </div>
        <div className='w-3/4 flex flex-col gap-2 items-center'>
          <div className='text-lg p-2'>{title}</div>
          <div className='flex items-center gap-2'>
            <button
              className='bg-slate-500 hover:bg-slate-600 text-white py-1 px-3 rounded'
              onClick={() => handleChange(-1)}
            >
              &#9660;
            </button>
            <div className='text-lg'>{quantity}</div>
            <button
              className='bg-slate-500 hover:bg-slate-600 text-white py-1 px-3 rounded'
              onClick={() => handleChange(1)}
            >
              &#9650;
            </button>
          </div>
          <div className='text-lg font-semibold'>Item total: &#8377;{(price*quantity).toFixed(2)}</div>
          <button
            className='bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded w-40'
            onClick={() => handleChange(-quantity)}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  )
}

export default CartItem