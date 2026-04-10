document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    let email = document.getElementById("email").value;
    let confirmEmail = document.getElementById("confirm-email").value;
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirm-password").value;
    let emailError = document.getElementById("email-error");
    let passwordError = document.getElementById("password-error");
    let valid = true;

    emailError.classList.remove('show');
    passwordError.classList.remove('show');

    if (email !== confirmEmail) {
        emailError.classList.add('show');
        valid = false;
    }

    if (password !== confirmPassword) {
        passwordError.classList.add('show');
        valid = false;
    }

    if (valid) {
        showSuccessPopup();
    } else {
        showErrorPopup("Please make sure your email and password match.");
    }
});

function showSuccessPopup() {
    const popup = document.getElementById('successPopup');
    popup.classList.add('show');
}

function showErrorPopup(message) {
    const popup = document.getElementById('errorPopup');
    const errorMessage = document.getElementById('errorMessage');
    errorMessage.textContent = message;
    popup.classList.add('show');
}

function closePopup() {
    const popup = document.getElementById('successPopup');
    popup.classList.remove('show');
    setTimeout(() => {
        window.location.href = 'homepage.html';
    }, 300);
}

function closeErrorPopup() {
    const popup = document.getElementById('errorPopup');
    popup.classList.remove('show');
}

window.closePopup = closePopup;
window.closeErrorPopup = closeErrorPopup;