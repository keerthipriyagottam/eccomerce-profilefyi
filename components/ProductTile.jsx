// common' component for showing product as a tile
'use client'
import './../styles/globals.css'
import { updateCart } from '../utility/updateCart';

const ProductTile = ({image,price,title,id,inCart,reloadHomePage}) => {
  const userId=localStorage.getItem('userId');
  // const[incart,setIncart]=useState(false)
  const handleAddToCart=async()=>{
    await updateCart(userId,id,1);
    reloadHomePage();
  }

  return (
    <div className='flex flex-col'>
      <div className='flex bg-stone-100 rounded-md justify-center p-8'>
        <img className='object-contain h-48' src={image} alt='Thumbnail'/>
      </div>
      <div className='text-lg text-slate-600 font-light'>{title}</div>
      <div className='flex flex-col items-center p-2 mt-auto'>
        <div className='text-lg font-normal'><strong>&#8377;{price}</strong></div>
        {!inCart && <button className='bg-slate-500 hover:bg-slate-600 text-white py-1 px-3 rounded justify-self-end' onClick={handleAddToCart}>Add to Cart</button>}
        {inCart && <button className='flex items-center bg-green-500 text-white py-1 px-3 rounded justify-self-end cursor-default'>
          <span>Added to Cart</span>
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 13l4 4L19 7"></path>
          </svg>
        </button>}
      </div>
    </div>
  )
}

export default ProductTile