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
        if (method.value === 'cod') {
            document.getElementById('totalAmount').textContent = '$1,275.35';
        } else {
            document.getElementById('totalAmount').textContent = '$1,270.35';
        }
    });
});

    // Form validation
    function validateForm() {
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;

    if (!firstName || !lastName || !email || !address) {
    alert('Please fill in all required fields');
    return false;
}

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
    alert('Please enter a valid email address');
    return false;
}

    // Validate card details if card payment is selected
    if (document.getElementById('cardPayment').checked) {
    const cardNumber = document.getElementById('cardNumber').value;
    const expiryDate = document.getElementById('expiryDate').value;
    const cvv = document.getElementById('cvv').value;

    if (!cardNumber || !expiryDate || !cvv) {
    alert('Please fill in all card details');
    return false;
}

    // Simple card validation
    if (cardNumber.replace(/\s/g, '').length !== 16) {
    alert('Please enter a valid card number');
    return false;
}

    if (cvv.length !== 3) {
    alert('Please enter a valid CVV');
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
    alert('Your order has been placed successfully! Thank you for shopping with CS Antiques.');

    // Redirect to order confirmation page
    window.location.href = 'order-confirmation.html';
}
}

    // Initialize payment details
    document.getElementById('cardDetails').classList.add('active');
