export async function fetchCart(userId) {
    const response= await fetch(`http://localhost:8080/cart/cartbyuserid/${userId}`)
    let cartContent=[];
    if(response.ok){
        cartContent= await response.json();
    }
    return cartContent;
}
