    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    });

    // Form validation
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        if (!email || !password) {
        alert('Please fill all required fields');
        return;
        }

    });

    $('#login').click(()=>{
        const user = {
            email : $('#email').val(),
            password : $('#password').val()
        };
        $.ajax({
            url: "http://localhost:8080/api/v1/user/login",
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(user),
            success: () => {
                alert("Login Successfully")
                window.location.href = "../../Frontend/index.html";
            },
            error: () => alert("Login Unsuccessfully!")
        });
    });