document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM loaded - JavaScript is working!");
    
   
    const totalElement = document.querySelector('.total');
    const plusButtons = document.querySelectorAll('.fa-plus-circle');
    const minusButtons = document.querySelectorAll('.fa-minus-circle');
    const quantityElements = document.querySelectorAll('.quantity');
    const deleteButtons = document.querySelectorAll('.fa-trash-alt');
    const heartButtons = document.querySelectorAll('.fa-heart');
    const unitPrices = document.querySelectorAll('.unit-price');

    
    let quantities = [0, 0, 0];
    let totalPrice = 0;

   
    function updateTotalPrice() {
        totalPrice = 0; 
        
        
        unitPrices.forEach((unitPriceElement, index) => {
            // Get the price (remove the $ sign and convert to number)
            const priceText = unitPriceElement.textContent.trim();
            const price = parseFloat(priceText.replace(' $', ''));
            
            // Only add if price is valid number
            if (!isNaN(price)) {
                totalPrice += price * quantities[index];
            }
        });
        
        // Update the total display
        totalElement.textContent = `${totalPrice} $`;
        console.log("Total updated:", totalPrice);
    }

    // Add event listeners to plus buttons
    plusButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            console.log("Plus clicked for product", index + 1);
            // Increase quantity for this product
            quantities[index]++;
            quantityElements[index].textContent = quantities[index];
            
            // Update total price
            updateTotalPrice();
        });
    });

    // Add event listeners to minus buttons
    minusButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            console.log("Minus clicked for product", index + 1);
            // Only decrease if quantity is greater than 0
            if (quantities[index] > 0) {
                quantities[index]--;
                quantityElements[index].textContent = quantities[index];
                
                // Update total price
                updateTotalPrice();
            }
        });
    });

    // Add event listeners to delete buttons
    deleteButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            console.log("Delete clicked for product", index + 1);
            // Find the parent card body and remove it
            const cardBody = button.closest('.card-body');
            
            if (cardBody) {
                // Reset quantity for this product before removing
                quantities[index] = 0;
                
                // Remove the entire product card
                cardBody.remove();
                
                // Update total price
                updateTotalPrice();
                
                // Show a message
                console.log(`Product ${index + 1} removed from cart`);
            }
        });
    });

    // Add event listeners to heart buttons (like/favorite functionality)
    heartButtons.forEach((button, index) => {
        // Initialize heart to empty (far class)
        button.classList.add('far');
        
        button.addEventListener('click', () => {
            // Toggle between regular heart and solid heart (like/unlike)
            if (button.classList.contains('far')) { // Empty heart
                button.classList.remove('far');
                button.classList.add('fas'); // Solid heart
                button.style.color = 'red';
                console.log(`Product ${index + 1} liked`);
            } else { 
                button.classList.remove('fas');
                button.classList.add('far'); 
                button.style.color = ''; 
                console.log(`Product ${index + 1} unliked`);
            }
        });
    });

    updateTotalPrice();
});