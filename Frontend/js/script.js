document.addEventListener('DOMContentLoaded', function() {
    let email = localStorage.getItem("csLoginEmail")

    if (email === null){

    }else {
        $('#login-signup-btn').css("display","none");
    }
});

// Mobile menu toggle
document.getElementById('hamburger').addEventListener('click', function() {
    document.getElementById('nav-menu').classList.toggle('show');
});