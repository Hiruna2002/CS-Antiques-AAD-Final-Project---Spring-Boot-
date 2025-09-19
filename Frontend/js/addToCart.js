document.addEventListener("DOMContentLoaded", function() {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get("id");

    console.log("Fetched product ID:", productId);

    if (!productId) {
        console.error("Product ID is missing in the URL!");
        alert("No product selected.");
        return; // Stop execution
    }

    // Example: make an API call for product details
    $.ajax({
        url:"http://localhost:8080/api/v1/marketplace/"+productId,
        method: "GET",
        dataType: "json",
        success: function(response) {
            console.log("Product details:", response);
            let html = "";
            const product = response.data;

            const user = {
                id : product.id,
                name : product.productName,
                category : product.category,
                desc : product.description,
                price : product.category,
                stock : product.stock
            };
            $.ajax({
                url: "http://localhost:8080/api/v1/addToCart/saveItem",
                method:"Get",
                contentType:"application/json",
                data: JSON.stringify(user),
                success: () => {
                    alert("Cart added successfully");
                }
            });




               html += `
                <div class="cart-item">
            <div class="item-image">
                <img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'><rect width='120' height='120' fill='%23FFDE21'/><path d='M30,30 L90,30 L90,90 L30,90 Z' stroke='%23FF9500' stroke-width='2' fill='none'/></svg>" alt="Vintage Pettagam Chest">
            </div>
            <div class="item-details">
                <h3 class="item-name">${product.productName}</h3>
                <div class="item-category">${product.category}</div>
                <p class="item-description">${product.description}</p>
                <div class="item-price">Rs. ${product.productPrice}</div>
            </div>
            <div class="item-controls">
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="updateQuantity(this, -1)">-</button>
                    <input type="number" class="quantity-input" value="1" min="1" onchange="updateItemTotal(this)">
                    <button class="quantity-btn" onclick="updateQuantity(this, 1)">+</button>
                </div>
                <button class="remove-item" onclick="removeItem(this)">
                    <i class="fas fa-trash"></i> Remove
                </button>
            </div>
        </div>
               `;

            document.getElementById("addToCartPage").innerHTML = html;
        }

    });
});


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