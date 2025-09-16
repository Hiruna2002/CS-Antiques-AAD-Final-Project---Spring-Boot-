    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

    // Profile edit functionality
    const editToggle = document.getElementById('editToggle');
    const cancelBtn = document.getElementById('cancelBtn');
    const profileForm = document.getElementById('profileForm');
    const formInputs = profileForm.querySelectorAll('input, textarea');
    const formActions = document.getElementById('formActions');
    let originalValues = {};

    // Store original values
    formInputs.forEach(input => {
    originalValues[input.id] = input.value;
});

    // Toggle edit mode
    editToggle.addEventListener('click', () => {
    const isEditing = !formInputs[0].disabled;

    if (isEditing) {
    // Currently editing, switch back to view mode
    formInputs.forEach(input => {
    input.disabled = true;
    input.value = originalValues[input.id];
});
    formActions.style.display = 'none';
    editToggle.innerHTML = '<i class="fas fa-edit"></i> Edit Profile';
} else {
    // Switch to edit mode
    formInputs.forEach(input => {
    input.disabled = false;
});
    formActions.style.display = 'flex';
    editToggle.innerHTML = '<i class="fas fa-times"></i> Cancel Editing';
}
});

    // Cancel editing
    cancelBtn.addEventListener('click', () => {
    formInputs.forEach(input => {
        input.value = originalValues[input.id];
        input.disabled = true;
    });
    formActions.style.display = 'none';
    editToggle.innerHTML = '<i class="fas fa-edit"></i> Edit Profile';
});

    // Form submission
    profileForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // In a real application, this would save to a server
    // For this demo, we'll just show a success message
    alert('Profile updated successfully!');

    // Update original values
    formInputs.forEach(input => {
    originalValues[input.id] = input.value;
    input.disabled = true;
});

    formActions.style.display = 'none';
    editToggle.innerHTML = '<i class="fas fa-edit"></i> Edit Profile';
});

    // Set address as default
    const setDefaultButtons = document.querySelectorAll('.address-actions button:last-child');

    setDefaultButtons.forEach(button => {
    if (button.textContent.includes('Set as Default')) {
    button.addEventListener('click', function() {
    const addressCard = this.closest('.address-card');
    const allAddressCards = document.querySelectorAll('.address-card');

    // Remove default class from all cards
    allAddressCards.forEach(card => {
    card.classList.remove('default');
    const badge = card.querySelector('.address-default-badge');
    if (badge) {
    badge.remove();
}
});

    // Add default class to selected card
    addressCard.classList.add('default');

    // Add default badge
    const defaultBadge = document.createElement('span');
    defaultBadge.className = 'address-default-badge';
    defaultBadge.textContent = 'Default';
    addressCard.querySelector('.address-type').after(defaultBadge);

    // Update buttons
    const addressActions = document.querySelectorAll('.address-actions');
    addressActions.forEach(actions => {
    const setDefaultBtn = actions.querySelector('button:last-child');
    if (setDefaultBtn && setDefaultBtn.textContent.includes('Set as Default')) {
    setDefaultBtn.style.display = 'block';
}
});

    // Hide set as default button for the default address
    this.style.display = 'none';
});
}
});