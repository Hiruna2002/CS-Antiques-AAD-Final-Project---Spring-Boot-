let length = 0;
document.addEventListener('DOMContentLoaded', function() {
    $.ajax({
        url:"http://localhost:8080/api/v1/user/getAll",
        method:"GET",
        dataType:"json",
        success: function (response){
            const users = response.data || [];
            length = users.length
        }
    });
});


// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Form validation
const signupForm = document.getElementById('signupForm');

signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const number = document.getElementById('number').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const terms = document.getElementById('terms').checked;

    if (!name || !address || !number || !email || !password || !terms) {
        alert('Please fill all required fields');
        return;
    }

    // Simulate successful signup
    alert('Account created successfully! Redirecting to login...');
    window.location.href = 'login.html';
});

function loadUserIds(length){
    let count = length + 1;
    let id = "U" + count.toString().padStart(3, "0");
    return id;
}

$('#signup').click(() => {
    const user = {
        id : loadUserIds(length),
        name: $('#name').val(),
        address: $('#address').val(),
        number: $('#number').val(),
        email: $('#email').val(),
        password: $('#password').val(),
        role : "user",
    };
    $.ajax({
        url: "http://localhost:8080/api/v1/user/register",
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(user),
        success: () => {
            alert("Saved Successfully")
            window.location.href = "../../Frontend/login.html";
        },
        error: () => alert("Error saving User!")
    });
});