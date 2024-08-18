export async function fetchCart(userId) {
    try {
        const response= await fetch(`https://ecommerce-profilefyi-backend.onrender.com/cart/cartbyuserid/${userId}`)
        let cartContent=[];
        if(response.ok){
            cartContent= await response.json();
        } else {
            throw new Error('Network response was not ok.')
        }
        return cartContent;
    } catch {
        alert('Error occured while fetching cart items. Please try later')
    }
}
