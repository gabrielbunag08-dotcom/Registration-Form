document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const togglePassword = document.getElementById('togglePassword');
    const passwordField = document.getElementById('loginPassword');
    const submitBtn = document.getElementById('submitBtn');

    // Eye Toggle
    togglePassword.addEventListener('click', function() {
        const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordField.setAttribute('type', type);
        this.style.color = type === 'text' ? '#00d2ff' : 'rgba(255, 255, 255, 0.5)';
    });

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const user = document.getElementById('loginUsername');
        let valid = true;

        if (user.value.trim() === "") { user.classList.add('error'); valid = false; }
        else { user.classList.remove('error'); }

        if (passwordField.value.trim() === "") { passwordField.classList.add('error'); valid = false; }
        else { passwordField.classList.remove('error'); }

        if (valid) {
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;
            setTimeout(() => {
                alert("Login Successful!");
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
            }, 2000);
        }
    });
});
