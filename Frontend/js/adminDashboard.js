let length = 0;
let count = 0;

// Initialize sales chart
    document.addEventListener('DOMContentLoaded', function() {
    const ctx = document.getElementById('salesChart').getContext('2d');
    const salesChart = new Chart(ctx, {
    type: 'line',
    data: {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
    label: 'Sales ($)',
    data: [1200, 1900, 1500, 2200, 1800, 2500, 3100],
    backgroundColor: 'rgba(255, 149, 0, 0.2)',
    borderColor: '#FF9500',
    borderWidth: 2,
    tension: 0.4,
    fill: true
}]
},
    options: {
    responsive: true,
    plugins: {
    legend: {
    display: false
}
},
    scales: {
    y: {
    beginAtZero: true,
    grid: {
    drawBorder: false
}
},
    x: {
    grid: {
    display: false
    }
    }
    }
    }

    });


    const btn = document.getElementById("dashboard");

    btn.style.backgroundColor = "rgba(255, 149, 0, 0.2)";
    btn.style.color = "white";


    $(".page-title").css("display", "block");
    $(".stats-cards").css(
    "display", "grid",
    "grid-template-columns", "repeat(3, minmax(250px, 1fr))"
    );
    $(".form-container").css("display", "none");
    $(".dashboard-row").css("display", "none");
    $(".table-container").css("display", "none");
    $('.timeLine').css("display","block");

        $.ajax({
            url:"http://localhost:8080/api/v1/marketplace/getAll",
            method:"GET",
            dataType:"json",
            success: function (response){
                const users = response.data || [];
                length = users.length
            }
        });

        $.ajax({
            url:"http://localhost:8080/api/v1/marketplace/getAll",
            method:"GET",
            dataType: "json",
            success:function (response){
                const products = response.data;
                let data = "";
                products.forEach(product=>{
                    data += `<tr>
                            <td>${product.id}</td>
                            <td>${product.productName}</td>
                            <td>${product.category}</td> 
                            <td>${product.productPrice}</td>
                            <td>${product.stock}</td>
                            <td>
                                <button class="action-btn"><i class="fas fa-edit"></i></button>
                                <button class="action-btn"><i class="fas fa-trash"></i></button>
                            </td>
                        </tr>`;
                });

                $('#product_table').append(data);
            }
        });

        $.ajax({
            url:"http://localhost:8080/api/v1/user/getAll",
            method:"GET",
            dataType:"json",
            success:function(response){
                const users = response.data;
                let data = "";
                users.forEach(user=>{
                    if (user.role === "user" || user.role === "User" || user.role === "USER"){
                        data += `<tr>
                            <td>${user.id}</td>
                            <td>${user.name}</td>
                            <td>${user.email}</td> 
                            <td>${user.role}</td>
                        </tr>`;
                    }
                });
                $('#customer_table').append(data);
            }
        });

        $.ajax({
            url:"http://localhost:8080/api/v1/user/getAll",
            method:"GET",
            dataType:"json",
            success:function(response){
                const employee = response.data || [];
                count = employee.length

                const employee_data = response.data;
                let data = "";

                employee_data.forEach(employeeData=>{
                    if (employeeData.role === "employee" || employeeData.role === "Employee" || employeeData.role === "EMPLOYEE"){
                        data += `<tr>
                            <td>${employeeData.id}</td>
                            <td>${employeeData.name}</td>
                            <td>${employeeData.address}</td>
                            <td>${employeeData.number}</td>
                            <td>${employeeData.email}</td> 
                        </tr>`;
                    }
                });
                $('#employee_tbody').append(data);

            }
        });

});

    function hover(btn){
    btn.style.backgroundColor = "rgba(255, 149, 0, 0.2)";
    btn.style.color = "white";
}

    function removeHover(btn){
    btn.style.backgroundColor = "";
    btn.style.color = "";
}

    const dashboard = document.getElementById("dashboard");
    const addProduct = document.getElementById("addProduct");
    const orders = document.getElementById("orders");
    const products = document.getElementById("products");
    const customers = document.getElementById("customers");
    const employee = document.getElementById("employee");
    const analytics = document.getElementById("analytics");
    const setting = document.getElementById("Setting");


    $('#dashboard').on('click',function () {
    $(".page-title").css("display","block");
    $(".stats-cards").css(
    "display", "grid",
    "grid-template-columns", "repeat(3, minmax(250px, 1fr))"
    );
    $(".form-container").css("display", "none");
    $(".dashboard-row").css("display", "none");
    $(".table-container").css("display", "none");
    $("#addEmployeeForm").css("display","none");
    hover(dashboard);
    removeHover(addProduct);
    removeHover(orders);
    removeHover(products);
    removeHover(customers);
    removeHover(analytics);
    removeHover(setting);
    removeHover(employee);
});

    const marketplaceCategories = {
    original: [
{value: "pettagam", text: "Pettagam"},
{value: "chimney", text: "Chimney"},
{value: "cupboard", text: "Cupboard"},
{value: "gramophone", text: "Gramophone"},
{value: "others", text: "Others"}
    ],
    reproduction: [
{value: "pettagam", text: "Pettagam"},
{value: "chimney", text: "Chimney"},
{value: "horses", text: "Lucky Horses"},
{value: "indian_horses", text: "Indian Horses"},
{value: "gramophone", text: "Gramophone"},
{value: "others", text: "Others"}
    ]
};

    $('#addProduct').on('click',function () {
    $('.page-title').css("display","none");
    $('.stats-cards').css("display","none");
    $('.dashboard-row').css("display","none");
    $('.table-container').css("display","none");
    $('.form-container').css("display","block");
    $("#addEmployeeForm").css("display","none");
    hover(addProduct);
    removeHover(dashboard);
    removeHover(orders);
    removeHover(products);
    removeHover(customers);
    removeHover(analytics);
    removeHover(setting);
    removeHover(employee);

    const tabs = document.querySelectorAll('.tab');
    const marketplaceInput = document.getElementById('productMarketplace');
    const categorySelect = document.getElementById('productCategory');
    const marketplaceBadge = document.getElementById('marketplaceBadge');

    // Set initial categories for Original Antiques
    updateCategories('original');

    // Add tab click event listeners
    tabs.forEach(tab => {
    tab.addEventListener('click', function() {
    const marketplace = this.getAttribute('data-marketplace');

    // Update active tab
    tabs.forEach(t => t.classList.remove('active'));
    this.classList.add('active');

    // Update marketplace value
    marketplaceInput.value = marketplace;

    // Update categories
    updateCategories(marketplace);

    // Update marketplace badge
    updateMarketplaceBadge(marketplace);
});
});

    // Form input event listeners for live preview
    document.getElementById('productName').addEventListener('input', updatePreview);
    document.getElementById('productPrice').addEventListener('input', updatePreview);
    document.getElementById('productCategory').addEventListener('change', updatePreview);
    document.getElementById('productImage').addEventListener('input', updatePreview);
    document.getElementById('productDescription').addEventListener('input', updatePreview);

    // Form submission handler
    document.getElementById('addProductForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('productName').value;
    const price = parseFloat(document.getElementById('productPrice').value);
    const category = document.getElementById('productCategory').value;
    const image = document.getElementById('productImage').value;
    const description = document.getElementById('productDescription').value;
    const marketplace = document.getElementById('productMarketplace').value;

    if (name && price && category) {
    // In a real application, this would send data to a server
    // For this example, we'll just show a success message

    // Determine which marketplace to save to
    const marketplaceName = marketplace === 'original' ? 'Original Antiques' : 'Antiques Reproduction';

    alert(`Product "${name}" has been added to ${marketplaceName}!`);

    // Reset form
    this.reset();
    updatePreview();

    // Reset marketplace to original
    tabs.forEach(t => t.classList.remove('active'));
    document.querySelector('.tab[data-marketplace="original"]').classList.add('active');
    marketplaceInput.value = 'original';
    updateCategories('original');
    updateMarketplaceBadge('original');
} else {
    alert('Please fill all required fields');
}
});

    // Function to update category options based on marketplace
    function updateCategories(marketplace) {
    // Clear existing options
    categorySelect.innerHTML = '<option value="">Select category</option>';

    // Add new options
    marketplaceCategories[marketplace].forEach(category => {
    const option = document.createElement('option');
    option.value = category.value;
    option.textContent = category.text;
    categorySelect.appendChild(option);
});

    // Update preview
    updatePreview();
}

    // Function to update marketplace badge
    function updateMarketplaceBadge(marketplace) {
    if (marketplace === 'original') {
    marketplaceBadge.className = 'marketplace-badge badge-original';
    marketplaceBadge.textContent = 'Original Antiques';
    $('.timeLine').css("display","block");
} else {
    marketplaceBadge.className = 'marketplace-badge badge-reproduction';
    marketplaceBadge.textContent = 'Antiques Reproduction';
        $('.timeLine').css("display","none");
}
}

    // Function to update product preview
    function updatePreview() {
    const name = document.getElementById('productName').value || 'Product Name';
    const price = document.getElementById('productPrice').value || '0.00';
    const category = document.getElementById('productCategory');
    const categoryText = category.options[category.selectedIndex]?.text || 'Category';
    const image = document.getElementById('productImage').value;
    const description = document.getElementById('productDescription').value || 'Product description will appear here.';

    // Update preview elements
    document.getElementById('previewName').textContent = name;
    document.getElementById('previewPrice').textContent = `$${parseFloat(price).toFixed(2)}`;
    document.getElementById('previewCategory').textContent = categoryText;
    document.getElementById('previewDescription').textContent = description;

    // Update image if provided
    if (image) {
    document.getElementById('previewImage').src = image;
}
}

})

    $('#orders').on('click',function () {
    $('.page-title').css("display","none");
    $('.stats-cards').css("display","none");
    $('.dashboard-row').css("display","none");
    $('.table-container').css("display","block");
    $('.form-container').css("display","none");
    $('#productTable').css("display","none");
    $("#addEmployeeForm").css("display","none");
    $('#employeeTable').css("display","none");
    $('#customerTable').css("display","none");
    hover(orders);
    removeHover(dashboard);
    removeHover(addProduct);
    removeHover(products);
    removeHover(customers);
    removeHover(analytics);
    removeHover(setting);
    removeHover(employee);
});

    $('#products').on('click',function () {
    $('.page-title').css("display","none");
    $('.stats-cards').css("display","none");
    $('.dashboard-row').css("display","none");
    $('.table-container').css("display","none");
    $('.form-container').css("display","none");
    $('#productTable').css("display","block");
    $("#addEmployeeForm").css("display","none");
    hover(products);
    removeHover(dashboard);
    removeHover(addProduct);
    removeHover(orders);
    removeHover(customers);
    removeHover(analytics);
    removeHover(setting);
    removeHover(employee);
});

$('#customers').on('click',function () {
    $('.page-title').css("display","none");
    $('.stats-cards').css("display","none");
    $('.dashboard-row').css("display","none");
    $('.table-container').css("display","none");
    $('.form-container').css("display","none");
    $('#productTable').css("display","none");
    $('#customerTable').css("display","block");
    $("#addEmployeeForm").css("display","none");
    hover(customers);
    removeHover(dashboard);
    removeHover(addProduct);
    removeHover(orders);
    removeHover(analytics);
    removeHover(setting);
    removeHover(products);
    removeHover(employee);
});

$('#employee').on('click',function () {
    $('.page-title').css("display","none");
    $('.stats-cards').css("display","none");
    $('.dashboard-row').css("display","none");
    $('.table-container').css("display","none");
    $('.form-container').css("display","none");
    $('#productTable').css("display","none");
    $('#customerTable').css("display","none");
    $('#employeeTable').css("display","block");
    $("#addEmployeeForm").css("display","none");
    hover(employee);
    removeHover(dashboard);
    removeHover(addProduct);
    removeHover(orders);
    removeHover(analytics);
    removeHover(setting);
    removeHover(products);
    removeHover(customers);
});



    $('#analytics').on('click',function () {
        $('.page-title').css("display","none");
        $('.stats-cards').css("display","none");
        $('.dashboard-row').css("display","block");
        $('.table-container').css("display","none");
        $('.form-container').css("display","none");
        $("#addEmployeeForm").css("display","none");
        hover(analytics);
        removeHover(dashboard);
        removeHover(addProduct);
        removeHover(orders);
        removeHover(customers);
        removeHover(products);
        removeHover(setting);
        removeHover(employee);
    });

    $("#productCategory").on('change', function () {
        const value = $(this).val();
        if (value === "Pettagam" || value === "pettagam") {
            $("#width-height-length").css({
                "display": "flex",
                "justify-content": "space-between"
            });   // show when Pettagam
               // show when Pettagam

        } else {
            $("#width-height-length").hide();   // hide for all other categories
        }
    });

    let selectedCategory = "Original"; // default

    document.getElementById("originalTab").addEventListener("click", () => {
        selectedCategory = "Original";
        // console.log("Selected:", selectedCategory);
    });

    document.getElementById("reproductionTab").addEventListener("click", () => {
        selectedCategory = "Reproduction";
        // console.log("Selected:", selectedCategory);
    });

function loadProductIds(length){
    let count = length + 1;
    let id = "P" + count.toString().padStart(3, "0");
    return id;
}

    $('#addProductBtn').on('click', function () {
        const product = {
            id : loadProductIds(length),
            productName : $('#productName').val(),
            productPrice : parseFloat($('#productPrice').val()),
            category : $('#productCategory').val(),
            image : $('#productImage').val(),
            description : $('#productDescription').val(),
            width : parseFloat($('#productWidth').val()),
            height : parseFloat($('#productHeight').val()),
            length : parseFloat($('#productLength').val()),
            timeLine : $('#productTimeLine').val(),
            stock: $('#inStock').val()
        };
        $.ajax({
            url:"http://localhost:8080/api/v1/addProduct/saveProduct",
            method:"POST",
            contentType:"application/json",
            data:JSON.stringify(product),
            success:() => {
                alert("Product add Successfully")
            },
            error: () => alert("Error saving Product!")
        });
    });

function loadEmployeeIds(count){
    let counts = count + 1;
    let id = "E" + counts.toString().padStart(3, "0");
    return id;
}

    $("#addEmployees").on('click',function () {
        $("#employeeTable").css("display","none");
        $("#addEmployeeForm").css("display","block");
    });

    $("#addEmployee").on('click', function () {
       const employee = {
           id : loadEmployeeIds(count),
           name: $('#name').val(),
           address: $('#address').val(),
           number: $('#number').val(),
           email: $('#email').val(),
           password: $('#password').val(),
           role : "employee",
       };
       $.ajax({
           url: "http://localhost:8080/api/v1/user/register",
           method: 'POST',
           contentType: 'application/json',
           data: JSON.stringify(employee),
           success: () => {
               alert("Saved Successfully");
               $('.page-title').css("display","none");
               $('.stats-cards').css("display","none");
               $('.dashboard-row').css("display","none");
               $('.table-container').css("display","none");
               $('.form-container').css("display","none");
               $('#productTable').css("display","none");
               $('#customerTable').css("display","none");
               $('#employeeTable').css("display","block");
               $("#addEmployeeForm").css("display","none");

           },
           error: () => alert("Error saving Employee!")
       });
    });

$('#backBtn').on('click',function () {
    $('.page-title').css("display","none");
    $('.stats-cards').css("display","none");
    $('.dashboard-row').css("display","none");
    $('.table-container').css("display","none");
    $('.form-container').css("display","none");
    $('#productTable').css("display","none");
    $('#customerTable').css("display","none");
    $('#employeeTable').css("display","block");
    $("#addEmployeeForm").css("display","none");
});



