    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    const params = new URLSearchParams(window.location.search);
    const productId = params.get("id");

    hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    });

    // Image gallery functionality
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImage = document.getElementById('mainImage');

    thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('click', () => {
        // Remove active class from all thumbnails
        thumbnails.forEach(t => t.classList.remove('active'));

        // Add active class to clicked thumbnail
        thumbnail.classList.add('active');

        // Update main image
        const newImage = thumbnail.getAttribute('data-image');
        mainImage.setAttribute('src', newImage);
    });
});

    // Quantity controls
    function updateQuantity(change) {
    const quantityInput = document.getElementById('quantity');
    let quantity = parseInt(quantityInput.value);
    quantity += change;

    // Ensure quantity is within min and max values
    if (quantity < 1) quantity = 1;
    if (quantity > 2) quantity = 2;

    quantityInput.value = quantity;
}

    // Add to cart functionality
    function addToCart() {
    const quantity = document.getElementById('quantity').value;
    const productName = document.querySelector('.product-details h1').textContent;

    // Update cart count
    const cartCount = document.querySelector('.cart-count');
    let count = parseInt(cartCount.textContent);
    count += parseInt(quantity);
    cartCount.textContent = count;

    // Show confirmation
    alert(`Added ${quantity} ${productName} to your cart!`);
}

    // Tab functionality
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs and contents
        tabs.forEach(t => t.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));

        // Add active class to clicked tab
        tab.classList.add('active');

        // Show corresponding content
        const tabId = tab.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
    });
});

    $.ajax({
        url:"http://localhost:8080/api/v1/marketplace/${productId}",
        method:"GET",
        dataType:"jason",
        success:function (response) {
            console.log(response);
            const products = response.data;
            let html = "";

            products.forEach(product=>{
                html += `
                    
                `
            })
        }
    })
