    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

    // Cart functionality
    function updateQuantity(button, change) {
    const quantityInput = button.parentNode.querySelector('.quantity-input');
    let quantity = parseInt(quantityInput.value);
    quantity += change;

    if (quantity < 1) quantity = 1;

    quantityInput.value = quantity;
    updateItemTotal(quantityInput);
}

    function updateItemTotal(input) {
    // In a real application, this would calculate based on actual prices
    // For this demo, we'll just recalculate the total
    calculateTotals();
}

    function removeItem(button) {
    const cartItem = button.closest('.cart-item');
    cartItem.style.opacity = '0';

    setTimeout(() => {
    cartItem.remove();
    calculateTotals();
    updateCartCount();

    // Check if cart is empty
    if (document.querySelectorAll('.cart-item').length === 0) {
    showEmptyCart();
}
}, 300);
}

    function calculateTotals() {
    // In a real application, this would calculate based on actual prices and quantities
    // For this demo, we'll use fixed values
    const subtotal = 1129.97; // This would be calculated from items
    const shipping = 49.99;
    const tax = 90.40;
    const total = subtotal + shipping + tax;

    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('total').textContent = `$${total.toFixed(2)}`;
}

    function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    const itemCount = document.querySelectorAll('.cart-item').length;
    cartCount.textContent = itemCount;
}

    function showEmptyCart() {
    const cartItems = document.querySelector('.cart-items');
    cartItems.innerHTML = `
                <div class="empty-cart">
                    <i class="fas fa-shopping-cart"></i>
                    <h2>Your cart is empty</h2>
                    <p>Looks like you haven't added anything to your cart yet.</p>
                    <a href="originals.html" class="btn btn-primary" style="margin-top: 1.5rem;">Continue Shopping</a>
                </div>
            `;

    document.querySelector('.order-summary').style.display = 'none';
    document.querySelector('.continue-shopping-section').style.display = 'none';
}

    // Initialize totals
    calculateTotals();