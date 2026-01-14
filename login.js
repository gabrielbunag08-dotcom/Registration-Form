document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const btn = document.getElementById('submitBtn');
    const user = document.getElementById('loginUsername');
    const pass = document.getElementById('loginPassword');
    let isValid = true;

    // Simple Validation
    if (user.value.trim() === "") {
        user.classList.add('error');
        isValid = false;
    } else {
        user.classList.remove('error');
    }

    if (pass.value.trim() === "") {
        pass.classList.add('error');
        isValid = false;
    } else {
        pass.classList.remove('error');
    }

    if (isValid) {
        // Trigger Loading State
        btn.classList.add('loading');
        btn.disabled = true;

        // Simulate a server delay (2 seconds)
        setTimeout(() => {
            alert("Login Successful! Redirecting to dashboard...");
            btn.classList.remove('loading');
            btn.disabled = false;
        }, 2000);
    }
});
