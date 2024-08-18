import { fetchCart } from './fetchCart'

// A utility function to update the cart content.
// First step is to fetch the current cart content
// Second is to come up with the updated cart content, based on whether the item is already present or not.
// Send the new cart content to backend through the updateCart API so that the new content would replace the entire cart content in the DB.

export async function updateCart(userId,id,quantityToAdd){
    try {
        const currentCartContent = await fetchCart(userId);
        let productExistsInCart = false; // Initially we assume that product is not present in the cart
        let updatedCartContent = [];
        for(let i=0; i<currentCartContent.length; i++) {
            const item = currentCartContent[i];
            if(item.productId === id) {
                productExistsInCart = true; // If product present in cart already, turn the variable to true.
                const newQuantity = item.quantity + quantityToAdd; // Add the quantityToAdd to the current quantity present in cart.
                if (newQuantity > 0) {
                    updatedCartContent.push({ ...item, quantity: newQuantity });
                }
            } else {
                updatedCartContent.push(item)
            }
        }

        // If the item is not present in cart, we need to add a new entry in the new cart content.
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
