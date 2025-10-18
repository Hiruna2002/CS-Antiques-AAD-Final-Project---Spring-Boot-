let subTotal = 0;
document.addEventListener("DOMContentLoaded", function() {
    $.ajax({
        url:"http://localhost:8080/api/v1/addToCart/getAll",
        method:"GET",
        dataType:"json",
        success:function (response){
            const items = response.data;
            console.log("Items is :", items);
            let html = "";

            items.forEach(item=>{
                let price = parseFloat(item.price) || 0;  // ensure number
                let qty = parseInt(item.qty) || 1;        // default to 1 if null
                let lineTotal = price * qty;              // total for this item

                subTotal += lineTotal;

                html += `
                    <div class="cart-item">
                        <div class="item-image">
                            <img src="${item.image || 'https://via.placeholder.com/80x80'}" alt="${item.productName}">
                        </div>
                        <div class="item-details">
                            <div class="item-name">${item.productName}</div>
                            <div class="item-quantity">${item.qty}</div>
                            <div class="item-price">${item.price}</div>
                        </div>
                    </div>
                `;
            });
            document.getElementById("placeOrderItems").innerHTML = html;

            $('#subTotal').text("Rs. " + subTotal.toLocaleString());
            $('#totalAmount').text("Rs. " + subTotal.toLocaleString());
        }

    });
});

// Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

    // Payment method selection
    const paymentMethods = document.querySelectorAll('input[name="paymentMethod"]');
    const paymentDetails = document.querySelectorAll('.payment-details');

    paymentMethods.forEach(method => {
    method.addEventListener('change', () => {
        // Hide all payment details
        paymentDetails.forEach(detail => {
            detail.classList.remove('active');
        });

        // Show selected payment details
        const selectedMethod = document.querySelector(`#${method.value}Details`);
        if (selectedMethod) {
            selectedMethod.classList.add('active');
        }

        // Update total for COD
        // if (method.value === 'cod') {
        //     document.getElementById('totalAmount').textContent = '$1,275.35';
        // } else {
        //     document.getElementById('totalAmount').textContent = '$1,270.35';
        // }
    });
});

    // Form validation
    function validateForm() {
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const email = document.getElementById('email').value;
        const address = document.getElementById('address').value;

        if (!firstName || !lastName || !email || !address) {
            // alert('Please fill in all required fields');
            Swal.fire({
                title: 'Error!',
                text: 'Please fill in all required fields',
                icon: 'error',
                confirmButtonText: 'Ok'
            })
            return false;
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            // alert('Please enter a valid email address');
            Swal.fire({
                title: 'Error!',
                text: 'Please enter a valid email address',
                icon: 'error',
                confirmButtonText: 'Ok'
            })
            return false;
        }

        // Validate card details if card payment is selected
        if (document.getElementById('cardPayment').checked) {
            const cardNumber = document.getElementById('cardNumber').value;
            const expiryDate = document.getElementById('expiryDate').value;
            const cvv = document.getElementById('cvv').value;

            if (!cardNumber || !expiryDate || !cvv) {
                // alert('Please fill in all card details');
                Swal.fire({
                    title: 'Error!',
                    text: 'Please fill in all card details',
                    icon: 'error',
                    confirmButtonText: 'Ok'
                })
                return false;
             }

            // Simple card validation
            if (cardNumber.replace(/\s/g, '').length !== 16) {
                // alert('Please enter a valid card number');
                Swal.fire({
                    title: 'Error!',
                    text: 'Please enter a valid card number',
                    icon: 'error',
                    confirmButtonText: 'Ok'
                })
                return false;
            }

            if (cvv.length !== 3) {
                // alert('Please enter a valid CVV');
                Swal.fire({
                    title: 'Error!',
                    text: 'Please enter a valid CVV',
                    icon: 'error',
                    confirmButtonText: 'Ok'
                })
                return false;
            }
        }

    return true;
}

    // Place order function
    function placeOrder() {
        if (validateForm()) {
        // In a real application, this would submit the order to a server
        // For this demo, we'll show a success message
        // alert('Your order has been placed successfully! Thank you for shopping with CS Antiques.');
            Swal.fire({
                title: "Your order has been placed successfully! Thank you for shopping with CS Antiques.",
                icon: "success",
            })
        // Redirect to order confirmation page

        }
    }

    // Initialize payment details
    document.getElementById('cardDetails').classList.add('active');

    $('#placeOrder').on('click',function () {
        console.log(subTotal)
        let payMethod = "";
        if($('#cardPayment').is(':checked')){
            payMethod = "Card Payment";
        }else{
            payMethod = "Cash On Delivery";
        }
            let order = {
                cusId : localStorage.getItem("csLoginEmail"),
                firstName : $('#firstName').val(),
                lastName : $('#lastName').val(),
                email : $('#email').val(),
                phone : $('#phone').val(),
                address : $('#address').val(),
                city : $('#city').val(),
                zipCode : $('#zipCode').val(),
                country : "Sri Lanka",
                totalPrice :"Rs."+ subTotal,
                saveAddress : $('#saveAddress').val(),
                payMethod : payMethod,
                cardNumber : $('#cardNumber').val(),
                expDate : $('#expiryDate').val(),
                cvv : $('#cvv').val(),
                cardName : $('#cardName').val()
        };
        console.log(order);
        $.ajax({
           url: "http://localhost:8080/api/v1/placeOrder/saveOrder",
           method: "POST",
            contentType:"application/json",
            data: JSON.stringify(order),
            success: () => {
                // alert("Order Place successfully");
                Swal.fire({
                    title: "Order Place successfully",
                    icon: "success",
                })
            },
            error: (xhr, status, error) => {
                console.log("Error:", status, error);
                console.log(xhr.responseText);
            }
        });

    });
