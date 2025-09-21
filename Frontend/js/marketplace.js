let allProducts = [];

document.addEventListener('DOMContentLoaded', function() {
    $.ajax({
        url: "http://localhost:8080/api/v1/marketplace/getAll",
        method: "GET",
        dataType: "json",
        success: function(response) {
            allProducts = response.data;
            updateCounts(allProducts);
            renderProducts(allProducts); // show all at start
        },
        error: function(err) {
            console.error("Error fetching products:", err);
        }
    });
});

function updateCounts(products) {
    let counts = { pettagam:0, chimney:0, cupboard:0, gramophone:0, others:0 };

    products.forEach(p => {
        const cat = (p.category || "").toLowerCase();
        if (counts.hasOwnProperty(cat)) {
            counts[cat]++;
        } else {
            counts.others++;
        }
    });

    $('#pettagamCount').text(counts.pettagam);
    $('#chimneyCount').text(counts.chimney);
    $('#cupboardCount').text(counts.cupboard);
    $('#gramophoneCount').text(counts.gramophone);
    $('#otherCount').text(counts.others);
}

function renderProducts(products) {
    let html = "";
    products.forEach(product => {
        html += `
            <div class="product-card">
                <span class="product-badge">Featured</span>
                <img src="${product.image || 'https://via.placeholder.com/300x200'}"
                     alt="${product.productName}"
                     class="product-image"/>
                <div class="product-info">
                    <div class="product-category">${product.category || ""}</div>
                    <h3 class="product-name">${product.productName}</h3>
                    <p class="product-description">${product.description || ""}</p>
                    <div class="product-price">Rs.${product.productPrice}</div>
                    <div class="product-actions">
                        <button class="add-to-cart"><i class="fas fa-shopping-cart"></i> Add to Cart</button>
                        <button class="view-details" data-id="${product.id}">Details</button>
                    </div>
                </div>
            </div>
        `;
    });
    $('#products').html(html);
}

// ✅ filter by clicking a category card
$(document).on("click", ".category-card", function() {
    const category = this.id.toLowerCase(); // card id is same as category
    if (category === "others") {
        renderProducts(allProducts.filter(p => {
            const cat = (p.category || "").toLowerCase();
            return !["pettagam","chimney","cupboard","gramophone"].includes(cat);
        }));
    } else {
        renderProducts(allProducts.filter(p => (p.category || "").toLowerCase() === category));
    }
});



// Mobile menu toggle
                const hamburger = document.querySelector('.hamburger');
                const navMenu = document.querySelector('.nav-menu');

                hamburger.addEventListener('click', () => {
                navMenu.classList.toggle('active');
            });

                // Add to cart functionality
                const addToCartButtons = document.querySelectorAll('.add-to-cart');
                const cartCount = document.querySelector('.cart-count');
                let count = 3; // Starting count

                addToCartButtons.forEach(button => {
                button.addEventListener('click', () => {
                    count++;
                    cartCount.textContent = count;

                    // Get product name from the card
                    const productName = button.closest('.product-card').querySelector('.product-name').textContent;

                    // Show added message
                    // alert(`${productName} has been added to your cart!`);
                    Swal.fire({
                        title: `"${productName}" has been added to your cart!`,
                        icon: "success",
                    })
                });
            });

                // View details functionality
                const viewDetailsButtons = document.querySelectorAll('.view-details');

                viewDetailsButtons.forEach(button => {
                button.addEventListener('click', () => {
                    // Get product name from the card
                    const productName = button.closest('.product-card').querySelector('.product-name').textContent;

                    // In a real application, this would navigate to a product detail page
                    // alert(`Viewing details for: ${productName}`);
                    Swal.fire({
                        title: `Viewing details for: "${productName}"`,
                        icon: "success",
                    })
                });
            });

    // $("#products").addEventListener("click", (e) => {
    //     if (e.target.classList.contains("view-details")) {
    //         const productId = e.target.dataset.id; // get product id
    //         // Navigate to itemViewingPage with productId in query params
    //         window.location.href = `itemViewingPage.html?id=${productId}`;
    //     }
    // });

$(document).on("click", ".view-details", function() {
    const productId = $(this).data("id");
    window.location.href = `itemViewingPage.html?id=${productId}`;
});

$.ajax({
   url:"http://localhost:8080/api/v1/marketplace/getAll",
   method: "Get",
   dataType: "json",
    success : function(response) {
        console.log(response);
        const products = response.data;
        let html = "";

        products.forEach(product => {
        if (product.category === "pettagam" || product.category ==="Pettagam"){
            html += `
                <div class="product-card">
                    <span class="product-badge">Featured</span>
                    <img
                        src="${product.image || 'https://via.placeholder.com/300x200'}"
                        alt="${product.productName}"
                        class="product-image"/>
                    <div class="product-info">
                        <div class="product-category">${product.category || ""}</div>
                        <h3 class="product-name">${product.productName}</h3>
                        <p class="product-description">${product.description || ""}</p>
                        <div class="product-price">Rs.${product.productPrice}</div>
                        <div class="product-actions">
                            <button class="add-to-cart"><i class="fas fa-shopping-cart"></i> Add to Cart</button>
                            <button class="view-details" data-id="${product.id}">Details</button>
                        </div>
                    </div>
                </div>
                `;
        }else if (product.category === "Chimney" || product.category === Chimney){
            html += `
                <div class="product-card">
                    <span class="product-badge">Featured</span>
                    <img
                        src="${product.image || 'https://via.placeholder.com/300x200'}"
                        alt="${product.productName}"
                        class="product-image"/>
                    <div class="product-info">
                        <div class="product-category">${product.category || ""}</div>
                        <h3 class="product-name">${product.productName}</h3>
                        <p class="product-description">${product.description || ""}</p>
                        <div class="product-price">Rs.${product.productPrice}</div>
                        <div class="product-actions">
                            <button class="add-to-cart"><i class="fas fa-shopping-cart"></i> Add to Cart</button>
                            <button class="view-details" data-id="${product.id}">Details</button>
                        </div>
                    </div>
                </div>
                `;
        }

        });
        document.getElementById("products").innerHTML = html;
    }
});


