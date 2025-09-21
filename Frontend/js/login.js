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
            success:()=>{
                // checkRole(user.email);
                localStorage.setItem("csLoginEmail", user.email);
                console.log("User Login Detail is : ", user);
                console.log("User Email is : ", user.email);

                alert("Login Successfully")
                // window.location.href = "../../Frontend/index.html";
            },
            error: () => alert("Login Unsuccessfully!")
        });
    });

    // function checkRole(email){
    //     const encodedEmail = encodeURIComponent(email);
    //     $.ajax({
    //         url: "http://localhost:8080/api/v1/user/getUserByEmail/"+ encodedEmail,
    //         method:"GET",
    //         dataType:"json",
    //         success:function (response){
    //             const user = response.data;
    //
    //             if (user.role === "User" || user.role === "USER" || user.role === "user"){
    //                 window.location.href = "../../Frontend/index.html";
    //             }else if (user.role === "Admin" || user.role === "ADMIN" || user.role === "admin"){
    //                 window.location.href = "../../Frontend/adminDashboard.html";
    //             }else if (user.role === "Employee" || user.role === "EMPLOYEE" || user.role === "Employee"){
    //                 window.location.href = "../../Frontend/adminDashboard.html";
    //             }
    //         },
    //         error: function (err) {
    //             console.error("Error fetching user:", err);
    //             alert("Unable to get user info!");
    //         }
    //     });
    // }