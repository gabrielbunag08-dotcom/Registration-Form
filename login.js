document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const togglePassword = document.getElementById('togglePassword');
    const passwordField = document.getElementById('loginPassword');
    const submitBtn = document.getElementById('submitBtn');

    // Password Visibility Toggle
    togglePassword.addEventListener('click', function() {
        const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordField.setAttribute('type', type);
        this.style.color = type === 'text' ? '#00d2ff' : 'rgba(255, 255, 255, 0.5)';
    });

    // Form Submission Logic
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('loginUsername');
        let isValid = true;

        // Reset states
        username.classList.remove('error');
        passwordField.classList.remove('error');

        if (username.value.trim() === "") {
            username.classList.add('error');
            isValid = false;
        }
        if (passwordField.value.trim() === "") {
            passwordField.classList.add('error');
            isValid = false;
        }

        if (isValid) {
            // Start Spinner
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;

            // Simulate server delay
            setTimeout(() => {
                alert("Login Successful!");
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
            }, 2000);
        }
    });
});
