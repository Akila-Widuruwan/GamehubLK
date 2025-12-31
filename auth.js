
// auth.js - Authentication State Management

// User state
let currentUser = null;

// Check if user is logged in (from localStorage)
function checkAuthState() {
    const userData = localStorage.getItem('gamehub_user');
    if (userData) {
        currentUser = JSON.parse(userData);
        updateUIForLoggedInUser();
    }
}

// Login function
function loginUser(email, password) {
    // In real implementation, this would be an API call
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // For demo purposes, create a mock user
            const mockUser = {
                id: 'user_' + Date.now(),
                name: 'Demo User',
                email: email,
                phone: '+1234567890',
                joinedDate: new Date().toISOString(),
                isVerified: true,
                adsCount: 0
            };
            
            localStorage.setItem('gamehub_user', JSON.stringify(mockUser));
            currentUser = mockUser;
            updateUIForLoggedInUser();
            resolve(mockUser);
        }, 1000);
    });
}

// Signup function
function signupUser(userData) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const newUser = {
                id: 'user_' + Date.now(),
                name: userData.name,
                email: userData.email,
                phone: userData.phone || '',
                joinedDate: new Date().toISOString(),
                isVerified: false,
                adsCount: 0
            };
            
            localStorage.setItem('gamehub_user', JSON.stringify(newUser));
            currentUser = newUser;
            updateUIForLoggedInUser();
            resolve(newUser);
        }, 1000);
    });
}

// Social login (simulated)
function socialLogin(provider) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const socialUser = {
                id: 'user_' + Date.now(),
                name: 'Social User',
                email: `user@${provider}.com`,
                phone: '',
                joinedDate: new Date().toISOString(),
                isVerified: true,
                adsCount: 0,
                provider: provider
            };
            
            localStorage.setItem('gamehub_user', JSON.stringify(socialUser));
            currentUser = socialUser;
            updateUIForLoggedInUser();
            resolve(socialUser);
        }, 1000);
    });
}

// Logout function
function logoutUser() {
    localStorage.removeItem('gamehub_user');
    currentUser = null;
    updateUIForLoggedOutUser();
    window.location.href = 'index.html';
}

// Update UI when user is logged in
function updateUIForLoggedInUser() {
    // Update navigation
    const navLinks = document.querySelector('.nav-links');
    if (navLinks && currentUser) {
        // Remove existing user-related links
        const existingUserLinks = navLinks.querySelectorAll('.user-link');
        existingUserLinks.forEach(link => link.remove());
        
        // Add user dropdown
        const userDropdown = document.createElement('div');
        userDropdown.className = 'user-dropdown';
        userDropdown.innerHTML = `
            <a href="#" class="user-link" id="userMenuToggle">
                <i class="fas fa-user-circle"></i>
                ${currentUser.name.split(' ')[0]}
                <i class="fas fa-chevron-down"></i>
            </a>
            <div class="user-dropdown-menu" id="userDropdownMenu">
                <a href="dashboard.html"><i class="fas fa-tachometer-alt"></i> Dashboard</a>
                <a href="my-ads.html"><i class="fas fa-gamepad"></i> My Ads</a>
                <a href="create-ad.html"><i class="fas fa-plus-circle"></i> Post New Ad</a>
                <div class="dropdown-divider"></div>
                <a href="profile.html"><i class="fas fa-user"></i> My Profile</a>
                <a href="settings.html"><i class="fas fa-cog"></i> Settings</a>
                <a href="#" onclick="logoutUser()"><i class="fas fa-sign-out-alt"></i> Logout</a>
            </div>
        `;
        
        // Add to navigation
        navLinks.appendChild(userDropdown);
        
        // Add dropdown toggle functionality
        const toggleBtn = document.getElementById('userMenuToggle');
        const dropdownMenu = document.getElementById('userDropdownMenu');
        
        if (toggleBtn && dropdownMenu) {
            toggleBtn.addEventListener('click', function(e) {
                e.preventDefault();
                dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
            });
            
            // Close dropdown when clicking outside
            document.addEventListener('click', function(e) {
                if (!userDropdown.contains(e.target)) {
                    dropdownMenu.style.display = 'none';
                }
            });
        }
    }
    
    // Update any "Login" buttons to show user state
    const loginButtons = document.querySelectorAll('.login-button');
    loginButtons.forEach(button => {
        button.innerHTML = `<i class="fas fa-user"></i> ${currentUser.name.split(' ')[0]}`;
        button.href = 'dashboard.html';
    });
}

// Update UI when user is logged out
function updateUIForLoggedOutUser() {
    // Reset navigation
    const navLinks = document.querySelector('.nav-links');
    if (navLinks) {
        const existingUserLinks = navLinks.querySelectorAll('.user-link, .user-dropdown');
        existingUserLinks.forEach(link => link.remove());
        
        // Add login link
        const loginLink = document.createElement('a');
        loginLink.href = 'login.html';
        loginLink.className = 'login-button';
        loginLink.innerHTML = '<i class="fas fa-sign-in-alt"></i> Login / Signup';
        navLinks.appendChild(loginLink);
    }
}

// Check authentication state on page load
document.addEventListener('DOMContentLoaded', function() {
    checkAuthState();
});

// Export functions for use in other scripts
window.auth = {
    login: loginUser,
    signup: signupUser,
    socialLogin: socialLogin,
    logout: logoutUser,
    getUser: () => currentUser,
    isLoggedIn: () => currentUser !== null
};
