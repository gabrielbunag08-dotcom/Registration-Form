document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registrationForm');
    
    // Form field elements
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const username = document.getElementById('username');
    const phoneNumber = document.getElementById('phoneNumber');
    const email = document.getElementById('email');
    const gender = document.getElementById('gender');
    const dob = document.getElementById('dob');
    const country = document.getElementById('country');
    const homeAddress = document.getElementById('homeAddress');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
    const terms = document.getElementById('terms');

    // Validation functions
    function validateFirstName() {
        const value = firstName.value.trim();
        const error = document.getElementById('firstNameError');
        if (value === '') {
            showError(firstName, error, 'First name is required');
            return false;
        } else if (!/^[a-zA-Z]+$/.test(value)) {
            showError(firstName, error, 'First name should contain only letters');
            return false;
        } else {
            clearError(firstName, error);
            return true;
        }
    }

    function validateLastName() {
        const value = lastName.value.trim();
        const error = document.getElementById('lastNameError');
        if (value === '') {
            showError(lastName, error, 'Last name is required');
            return false;
        } else if (!/^[a-zA-Z]+$/.test(value)) {
            showError(lastName, error, 'Last name should contain only letters');
            return false;
        } else {
            clearError(lastName, error);
            return true;
        }
    }

    function validateUsername() {
        const value = username.value.trim();
        const error = document.getElementById('usernameError');
        if (value === '') {
            showError(username, error, 'Username is required');
            return false;
        } else if (value.length < 4) {
            showError(username, error, 'Username must be at least 4 characters');
            return false;
        } else {
            clearError(username, error);
            return true;
        }
    }

    function validatePhoneNumber() {
        const value = phoneNumber.value.trim();
        const error = document.getElementById('phoneNumberError');
        if (value === '') {
            showError(phoneNumber, error, 'Phone number is required');
            return false;
        } else if (!/^\d{10,11}$/.test(value)) {
            showError(phoneNumber, error, 'Phone number must be 10-11 digits');
            return false;
        } else {
            clearError(phoneNumber, error);
            return true;
        }
    }

    function validateEmail() {
        const value = email.value.trim();
        const error = document.getElementById('emailError');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (value === '') {
            showError(email, error, 'Email is required');
            return false;
        } else if (!emailRegex.test(value)) {
            showError(email, error, 'Please enter a valid email address');
            return false;
        } else {
            clearError(email, error);
            return true;
        }
    }

    function validateGender() {
        const value = gender.value;
        const error = document.getElementById('genderError');
        if (value === '') {
            showError(gender, error, 'Please select a gender');
            return false;
        } else {
            clearError(gender, error);
            return true;
        }
    }

    // --- REVISED DATE OF BIRTH VALIDATION ---
    function validateDOB() {
        const value = dob.value.trim();
        const error = document.getElementById('dobError');
        // Numeric Regex for MM/DD/YYYY format
        const dobRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;
        
        if (value === '') {
            showError(dob, error, 'Date of birth is required');
            return false;
        } else if (!dobRegex.test(value)) {
            // Fixes the error found in
            showError(dob, error, 'Format must be MM/DD/YYYY (Numbers only)');
            return false;
        } else {
            clearError(dob, error);
            return true;
        }
    }

    function validateCountry() {
        const value = country.value;
        const error = document.getElementById('countryError');
        if (value === '') {
            showError(country, error, 'Please select a country');
            return false;
        } else {
            clearError(country, error);
            return true;
        }
    }

    function validateHomeAddress() {
        const value = homeAddress.value.trim();
        const error = document.getElementById('homeAddressError');
        if (value === '') {
            showError(homeAddress, error, 'Home address is required');
            return false;
        } else if (value.length < 10) {
            showError(homeAddress, error, 'Please enter a complete address');
            return false;
        } else {
            clearError(homeAddress, error);
            return true;
        }
    }

    function validatePassword() {
        const value = password.value;
        const error = document.getElementById('passwordError');
        if (value === '') {
            showError(password, error, 'Password is required');
            return false;
        } else if (value.length < 8) {
            showError(password, error, 'Password must be at least 8 characters');
            return false;
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
            showError(password, error, 'Password must contain uppercase, lowercase, and number');
            return false;
        } else {
            clearError(password, error);
            return true;
        }
    }

    function validateConfirmPassword() {
        const value = confirmPassword.value;
        const error = document.getElementById('confirmPasswordError');
        if (value === '') {
            showError(confirmPassword, error, 'Please confirm your password');
            return false;
        } else if (value !== password.value) {
            showError(confirmPassword, error, 'Passwords do not match');
            return false;
        } else {
            clearError(confirmPassword, error);
            return true;
        }
    }

    function validateTerms() {
        const error = document.getElementById('termsError');
        if (!terms.checked) {
            error.textContent = 'You must agree to the terms and conditions';
            return false;
        } else {
            error.textContent = '';
            return true;
        }
    }

    function showError(input, errorElement, message) {
        input.classList.add('error');
        errorElement.textContent = message;
    }

    function clearError(input, errorElement) {
        input.classList.remove('error');
        errorElement.textContent = '';
    }

    // Add real-time validation
    firstName.addEventListener('blur', validateFirstName);
    lastName.addEventListener('blur', validateLastName);
    username.addEventListener('blur', validateUsername);
    phoneNumber.addEventListener('blur', validatePhoneNumber);
    email.addEventListener('blur', validateEmail);
    gender.addEventListener('change', validateGender);
    dob.addEventListener('blur', validateDOB);
    country.addEventListener('change', validateCountry);
    homeAddress.addEventListener('blur', validateHomeAddress);
    password.addEventListener('blur', validatePassword);
    confirmPassword.addEventListener('blur', validateConfirmPassword);
    terms.addEventListener('change', validateTerms);

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const validations = [
            validateFirstName(), validateLastName(), validateUsername(), 
            validatePhoneNumber(), validateEmail(), validateGender(), 
            validateDOB(), validateCountry(), validateHomeAddress(), 
            validatePassword(), validateConfirmPassword(), validateTerms()
        ];
        
        if (validations.every(v => v === true)) {
            alert('Registration successful! Form data is valid.');
            console.log('Form submitted successfully');
            // form.reset(); 
        } else {
            alert('Please fix all errors before submitting.');
        }
    });
});
