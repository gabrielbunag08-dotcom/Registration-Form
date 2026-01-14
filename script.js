document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registrationForm');
    
    // IDs of fields to validate
    const fields = ['firstName', 'lastName', 'username', 'phoneNumber', 'email', 'gender', 'dob', 'country', 'homeAddress', 'password', 'confirmPassword', 'terms'];

    const validate = {
        firstName: (val) => /^[a-zA-Z]+$/.test(val) ? '' : 'Letters only',
        lastName: (val) => /^[a-zA-Z]+$/.test(val) ? '' : 'Letters only',
        username: (val) => val.length >= 4 ? '' : 'At least 4 characters',
        phoneNumber: (val) => /^\d{10,11}$/.test(val) ? '' : '10-11 digits only',
        email: (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) ? '' : 'Invalid email format',
        gender: (val) => val !== '' ? '' : 'Select gender',
        
        // --- FIXED DOB LOGIC ---
        // This regex now properly handles MM/DD/YYYY
        dob: (val) => /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/.test(val) ? '' : 'Use MM/DD/YYYY format',
        
        country: (val) => val !== '' ? '' : 'Select country',
        homeAddress: (val) => val.length >= 10 ? '' : 'Address too short',
        password: (val) => (val.length >= 8 && /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(val)) ? '' : 'Need Upper/Lower/Number',
        confirmPassword: (val) => val === document.getElementById('password').value ? '' : 'Passwords do not match',
        
        // Checkbox validation
        terms: () => document.getElementById('terms').checked ? '' : 'You must agree'
    };

    function checkField(id) {
        const input = document.getElementById(id);
        const error = document.getElementById(id + 'Error');
        
        // Use checkbox state for terms, otherwise use text value
        const val = (id === 'terms') ? '' : input.value.trim();
        const message = validate[id](val);
        
        if (message) {
            input.classList.add('error'); // Triggers strong neon glow in CSS
            if (error) error.textContent = message;
            return false;
        } else {
            input.classList.remove('error');
            if (error) error.textContent = '';
            return true;
        }
    }

    // Add listeners to validate as you type/select
    fields.forEach(id => {
        const el = document.getElementById(id);
        const type = (el.tagName === 'SELECT' || el.type === 'checkbox') ? 'change' : 'blur';
        el.addEventListener(type, () => checkField(id));
    });

    // Form Submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const results = fields.map(id => checkField(id));
        if (results.every(res => res === true)) {
            alert('Registration Successful!');
        }
    });
});
