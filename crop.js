let cart = []; // Array to hold cart items

// Function to add item to cart
function addToCart(product) {
    cart.push(product);
    updateCartCount();
    displayCartItems();
}

// Function to update the cart count
function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    cartCountElement.innerText = cart.length; // Update cart count display
}

// Function to display items in the cart
function displayCartItems() {
    const cartItemsElement = document.getElementById('cart-items-modal');
    cartItemsElement.innerHTML = ''; // Clear existing items
    cart.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = item; // Add item to the list

        // Create a remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'remove-button';
        removeButton.onclick = () => removeFromCart(index); // Use the index to identify the item

        listItem.appendChild(removeButton); // Append remove button to the list item
        cartItemsElement.appendChild(listItem); // Append item to modal
    });
}

// Function to remove item from cart
function removeFromCart(index) {
    cart.splice(index, 1); // Remove item at specified index
    updateCartCount();
    displayCartItems(); // Update the displayed items
}

// Function to toggle cart modal visibility
function toggleCart() {
    const modal = document.getElementById('cart-modal');
    modal.style.display = modal.style.display === 'none' || modal.style.display === '' ? 'block' : 'none';
}
