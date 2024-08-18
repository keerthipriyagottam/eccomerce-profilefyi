import { fetchCart } from './fetchCart'

export async function updateCart(userId,id,quantityToAdd){
    try {
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

        const response= await fetch(`https://ecommerce-profilefyi-backend.onrender.com/cart/update/${userId}`,{
            method:'POST',
            headers:{'Content-Type': 'application/json'} ,
            body: JSON.stringify(updatedCartContent)
        });
        if(!response.ok) {
            throw new Error('Network response was not ok.')
        }
    } catch {
        alert('Error occured while updating cart items. Please try later.')
    }
}
