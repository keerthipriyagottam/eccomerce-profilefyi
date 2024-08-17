import { fetchCart } from './fetchCart'

export async function updateCart(userId,id,quantityToAdd){
    const currentCartContent = await fetchCart(userId);
    let productExistsInCart = false;
    let updatedCartContent = [];
    for(let i=0; i<currentCartContent.length; i++) {
        const item = currentCartContent[i];
        if(item.productId === id) {
            productExistsInCart = true;
            const newQuantity = item.quantity + quantityToAdd;
            if (newQuantity > 0) {
                updatedCartContent.push({ ...item, quantity: newQuantity });
            }
        } else {
            updatedCartContent.push(item)
        }
    }
    if(!productExistsInCart && quantityToAdd > 0) {
      updatedCartContent.push({productId: id, quantity: quantityToAdd});
    }

    const response= await fetch(`http://localhost:8080/cart/update/${userId}`,{
        method:'POST',
        headers:{'Content-Type': 'application/json'} ,
        body: JSON.stringify({items: updatedCartContent})
    });
}
