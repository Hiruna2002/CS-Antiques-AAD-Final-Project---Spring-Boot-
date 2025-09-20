document.addEventListener("DOMContentLoaded", function() {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get("id");

    const qtyInputs = document.querySelectorAll('.quantity');

    console.log("Fetched product ID:", productId);

    $.ajax({
        url:"http://localhost:8080/api/v1/addToCart/getAll",
        method:"GET",
        dataType: "json",
        success:function (response) {
            const products = response.data;
            let html = "";
            let totalPrice = 0;
            let shipping = 0;
            let total = 0;

            products.forEach(product=>{
                totalPrice+=product.price

                html += `
                <div class="cart-item">
            <div class="item-image">
                <img src="${product.image || 'https://via.placeholder.com/120x120'}" alt="${product.productName}">
            </div>
            <div class="item-details">
                <h3 class="item-name">${product.productName}</h3>
                <div class="item-category">${product.category || ""}</div>
                <p class="item-description">${product.description || ""}</p>
                <div class="item-price">Rs. ${product.price}</div>
            </div>
            <div class="item-controls">
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="updateQuantity(this, -1)">-</button>
                    <input type="number" id="qty${product.productId}" class="quantity quantity-input" value="1" min="1" onchange="updateItemTotal(this)">
                    <button class="quantity-btn" onclick="updateQuantity(this, 1)">+</button>
                </div>
                <button class="remove-item" onclick="removeItem(this)">
                    <i class="fas fa-trash"></i> Remove
                </button>
            </div>
        </div>
               `;
            });


            document.getElementById("addToCartPage").innerHTML = html;

            let subTotal = parseInt(totalPrice, 10);
            $('#subtotal').text("Rs." + parseInt(subTotal, 10));

            total = totalPrice + shipping;
            $('#total').text("Rs." + parseInt(total, 10));

            const value = $('#shippingPrice').val();

            if (!value){
                $('#shippingPrice').text("Free");
            }
        }
    });
});

$('#checkout').on('click', function () {

})


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