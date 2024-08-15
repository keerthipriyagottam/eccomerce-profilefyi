// common' component for showing product as a tile
import './../styles/globals.css'

const ProductTile = ({image,price,title}) => {
  return (
    <div className='flex flex-col w-1/5 '>
      <div className='flex bg-stone-100 rounded-md justify-center p-8 object-contain'>
        <img src={image} alt='Thumbnail'/>
      </div>
      <div className='flex flex-col items-center p-2'>
        <div className='text-lg text-slate-600 font-light'>{title}</div>
        <div className='text-lg font-normal'><strong>&#8377;{price}</strong></div>
        <div className='bg-slate-500 hover:bg-slate-800 text-white py-1 px-3 rounded'>
            <button>Add to Cart</button>
        </div>
      </div>
    </div>
  )
}

export default ProductTile