export async function fetchCart(userId) {
    const response= await fetch(`https://ecommerce-profilefyi-backend.onrender.com/cart/cartbyuserid/${userId}`)
    let cartContent=[];
    if(response.ok){
        cartContent= await response.json();
    }
    return cartContent;
}
