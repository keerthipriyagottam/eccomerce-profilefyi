// Home page for the application
'use client'
import ProductTile from "@/components/ProductTile"
import { useEffect, useState } from "react";

const page = () => {
  const[products,setProducts]=useState([]);

    const allProducts=async()=>{
        const response= await fetch('http://localhost:8080/product/allProducts',{
          method:'GET',
         headers:{'Content-Type': 'application/json'}
        })
        const result=await response.json();
        setProducts(result);
    }

    useEffect(()=>{
      allProducts();
    },[])

  return (
    <>
      <div className="grid grid-cols-4">
        {products.map((product)=>(
          <ProductTile
            image={product.image}
            title={product.name}
            price={product.salePrice}
          />
        ))}
      </div>
    </>
    
  )
}

export default page