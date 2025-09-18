document.addEventListener('DOMContentLoaded', () => {

    const signupForm = document.getElementById('signup-form');
    const loginForm = document.getElementById('login-form');

    // --- SIGNUP LOGIC ---
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const fullname = document.getElementById('fullname').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;

            // Basic Validation
            if (password !== confirmPassword) {
                alert("Passwords do not match!");
                return;
            }

            // SIMULATION: Store new user in localStorage
            // In a real app, this would be an API call to your backend.
            const newUser = { fullname, email, password }; // Note: Never store plain passwords
            localStorage.setItem('userAccount', JSON.stringify(newUser));

            alert("Account created successfully! Please log in.");
            window.location.href = 'login.html'; // Redirect to login page
        });
    }


    // --- LOGIN LOGIC ---
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            // SIMULATION: Check credentials against localStorage
            const storedUser = JSON.parse(localStorage.getItem('userAccount'));

            if (storedUser && storedUser.email === email && storedUser.password === password) {
                // Login successful
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('loggedInUser', JSON.stringify(storedUser)); // Store user details for profile page
                
                alert("Login successful!");
                window.location.href = 'profile.html'; // Redirect to profile page

            } else {
                // Login failed
                alert("Invalid email or password.");
            }
        });
    }
});