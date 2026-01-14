document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registrationForm');
    
    // List of all field IDs for easy management
    const fields = [
        'firstName', 'lastName', 'username', 'phoneNumber', 
        'email', 'gender', 'dob', 'country', 
        'homeAddress', 'password', 'confirmPassword', 'terms'
    ];

    // Validation logic for each field
    const validate = {
        firstName: (val) => /^[a-zA-Z]+$/.test(val) ? '' : 'First name should contain only letters',
        lastName: (val) => /^[a-zA-Z]+$/.test(val) ? '' : 'Last name should contain only letters',
        username: (val) => val.length >= 4 ? '' : 'Username must be at least 4 characters',
        phoneNumber: (val) => /^\d{10,11}$/.test(val) ? '' : 'Phone number must be 10-11 digits',
        email: (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) ? '' : 'Please enter a valid email address',
        gender: (val) => val !== '' ? '' : 'Please select a gender',
        
        // --- FIXED DATE OF BIRTH REGEX ---
        // This now accepts numbers in MM/DD/YYYY format (e.g., 10/08/2001)
        dob: (val) => /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/.test(val) ? '' : 'Format: MM/DD/YYYY (Numbers only)',
        
        country: (val) => val !== '' ? '' : 'Please select a country',
        homeAddress: (val) => val.length >= 10 ? '' : 'Please enter a complete address',
        password: (val) => (val.length >= 8 && /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(val)) ? '' : 'Must contain uppercase, lowercase, and number',
        confirmPassword: (val) => val === document.getElementById('password').value ? '' : 'Passwords do not match',
        
        // Special check for checkbox
        terms: () => document.getElementById('terms').checked ? '' : 'You must agree to the terms and conditions'
    };

    /**
     * Reusable function to check an individual field and apply neon error styles
     */
    function checkField(id) {
        const input = document.getElementById(id);
        const errorElement = document.getElementById(id + 'Error');
        const value = (id === 'terms') ? '' : input.value.trim();
        const errorMessage = validate[id](value);

        if (errorMessage !== '') {
            input.classList.add('error');
            if (errorElement) errorElement.textContent = errorMessage;
            return false;
        } else {
            input.classList.remove('error');
            if (errorElement) errorElement.textContent = '';
            return true;
        }
    }

    // Add Real-time Validation: Checks field when user clicks away (blur) or changes it
    fields.forEach(id => {
        const element = document.getElementById(id);
        const eventType = (element.tagName === 'SELECT' || element.type === 'checkbox') ? 'change' : 'blur';
        
        element.addEventListener(eventType, () => checkField(id));
    });

    // Form Submission Logic
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Run validation on all fields
        const isFormValid = fields.map(id => checkField(id)).every(result => result === true);

        if (isFormValid) {
            alert('Registration successful! Form data is valid.');
            console.log('Form submitted successfully');
            // form.reset(); // Optional: clears form after success
        } else {
            alert('Please fix all errors before submitting.');
        }
    });
});
