    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    let qty = 0;

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
    //     alert(`Added ${quantity} ${productName} to your cart!`);
        Swal.fire({
            title: `Added "${quantity} ${productName}" to your cart!`,
            icon: "success",
        })
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

    // Use event delegation because buttons are dynamically created
    $(document).on("click", "#addToCart", function() {
        const productId = $(this).data("id");  // get data-id
        console.log("Clicked ID:", productId);

        // redirect with productId in URL
        // window.location.href = `addToCart.html?id=${productId}`;

        $.ajax({
            url:"http://localhost:8080/api/v1/marketplace/"+productId,
            method: "GET",
            dataType: "json",
            success: function(response) {
                console.log("Product details:", response);
                let html = "";
                const product = response.data;

                const user = {
                    image : product.image,
                    productId : product.id,
                    productName : product.productName,
                    category : product.category,
                    description : product.description,
                    price : product.productPrice,
                    stock : product.stock,
                    cusId : localStorage.getItem("csLoginEmail"),
                    qty : 1,
                };
                $.ajax({
                    url: "http://localhost:8080/api/v1/addToCart/saveItem",
                    method:"POST",
                    contentType:"application/json",
                    data: JSON.stringify(user),
                    success: () => {
                        Swal.fire({
                            title: "Add to Cart Successfully!",
                            icon: "success",
                        })
                    },
                    error: (xhr, status, error) => {
                        console.log("Error:", status, error);
                        console.log(xhr.responseText);
                    }
                });


            },
            error: (xhr, status, error) => {
                console.log("Error fetching product:", status, error);
            }

        });
    });

    $.ajax({
        url:"http://localhost:8080/api/v1/marketplace/"+productId,
        method:"GET",
        dataType:"json",
        success:function (response) {
            console.log(response);
            const products = response.data;
            let html = "";
            let production;

            if (!products.timeLine){
                production = "Reproduction";
            }else {
                production = "Original Antiques";
            }

            if (products.category !=="Pettagam" || products.category !== "pettagam"){
                $('#dimensions').css("display","none");
            }else {
                $('#dimensions').css("display","block");
            }

                html += `
                    <!-- Product Images -->
    <div class="product-images">
      <span class="product-badge">Featured</span>
      <div class="main-image">
        <img src="${products.image || 'https://via.placeholder.com/600x400'}" id="mainImage">
      </div>
      <div class="thumbnail-container">
        <div class="thumbnail active">
          <img src="${products.image || 'https://via.placeholder.com/150x100'}" alt="Thumbnail 1">
        </div>
        <div class="thumbnail">
          <img src="${products.image || 'https://via.placeholder.com/150x100'}" alt="Thumbnail 2">
        </div>
        <div class="thumbnail">
          <img src="${products.image || 'https://via.placeholder.com/150x100'}" alt="Thumbnail 3">
        </div>
        <div class="thumbnail">
          <img src="${products.image || 'https://via.placeholder.com/150x100'}" alt="Thumbnail 4">
        </div>
      </div>
    </div>

    <!-- Product Details -->
    <div class="product-details">
      <h1>${products.productName}</h1>
      <span class="product-category">${products.category} • ${production}</span>

      <div class="product-rating">
        <div class="stars">
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star-half-alt"></i>
        </div>
        <span class="rating-count">(12 reviews)</span>
      </div>

      <div class="product-price">
<!--        <span class="product-original-price">$499.99</span>-->
        Rs. ${products.productPrice}
      </div>

      <p class="product-description">${products.description}</p>

      <div class="product-meta">
        <div class="meta-item">
          <i class="fas fa-ruler-combined"></i>
          <div>
            <div class="meta-label" id="dimensions">Dimensions</div>
            <div>36" W × 24" H</div>
          </div>
        </div>    
        <div class="meta-item">
          <i class="fas fa-warehouse"></i>
          <div>
            <div class="meta-label">In Stock</div>
            <div>${products.stock}</div>
          </div>
        </div>
      </div>

      <div class="product-actions">
        <div class="quantity-selector">
          <span class="quantity-label">Quantity:</span>
          <div class="quantity-controls">
            <button class="quantity-btn" onclick="updateQuantity(-1)">-</button>
            <input type="number" class="quantity-input" id="quantity" value="1" min="1" max="${products.stock}">
            <button class="quantity-btn" onclick="updateQuantity(1)">+</button>
          </div>
        </div>

        <div class="action-buttons">
          <button class="btn btn-primary" onclick="addToCart()" data-id="${products.id}" id="addToCart">
            <i class="fas fa-shopping-cart"></i> Add to Cart
          </button>
          <button class="btn btn-outline">
            <i class="fas fa-heart"></i> Add to Wishlist
          </button>
        </div>
      </div>
    </div>
                `;
            document.getElementById("itemView").innerHTML = html;
        },
        error: function(err) {
            console.error("Error fetching Item View:", err);
        }
    });
