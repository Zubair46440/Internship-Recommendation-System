document.addEventListener("DOMContentLoaded", function() {

    // ==================== Auto Image Changer for Gallery ====================
    const galleryContainer = document.querySelector('.gallery-container');
    const imageUrls = [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwnRTBbRwYV04HzwfG4P0av1nw8eeJUHX5wQ&s',
        'https://staticlearn.shine.com/l/m/images/blog/mobile/objective_for_internship_resume_for_freshers.webp',
        'https://skillsconnect.blob.core.windows.net/skillsconnect/blog/0986b1bec90d0381cf5ba89f177115c4.jpg',
        'https://idreamcareer.com/wp-content/uploads/2020/03/Tips-for-Interns.jpg',
        'https://idreamcareer.com/wp-content/uploads/2020/03/Tips-for-Interns.jpg',
        'https://insight.ieeeusa.org/wp-content/uploads/sites/2/2022/06/Internship-780x470.jpg',
        
    ];
    let currentImageIndex = 0;

    // Preload images and add them to the gallery
    imageUrls.forEach((url, index) => {
        const img = document.createElement('img');
        img.src = url;
        img.alt = `Gallery Image ${index + 1}`;
        if (index === 0) img.classList.add('active');
        galleryContainer.appendChild(img);
    });

    const galleryImages = galleryContainer.querySelectorAll('img');

    function changeImage() {
        galleryImages[currentImageIndex].classList.remove('active');
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        galleryImages[currentImageIndex].classList.add('active');
    }

    setInterval(changeImage, 4000); // Change image every 4 seconds


    // ==================== Dashboard Auto-Incrementing Numbers ====================
    const counters = document.querySelectorAll('.counter');
    const speed = 200; // The lower the number, the faster the count

    const animateCounter = (counter) => {
        const target = +counter.getAttribute('data-target');
        
        const updateCount = () => {
            const count = +counter.innerText;
            const increment = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(updateCount, 1);
            } else {
                counter.innerText = target.toLocaleString(); // Add commas for thousands
            }
        };
        updateCount();
    };
    
    // Use Intersection Observer to trigger animation only when visible
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        observer.observe(counter);
    });

});

document.addEventListener('DOMContentLoaded', () => {
    // --- Sidebar and Overlay Functionality ---
    const hamburger = document.getElementById('hamburger');
    const sidebar = document.getElementById('sidebar');
    const closeBtn = document.getElementById('close-btn');
    const overlay = document.getElementById('overlay');

    const openSidebar = () => {
        sidebar.classList.add('show');
        overlay.classList.add('show');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    };

    const closeSidebar = () => {
        sidebar.classList.remove('show');
        overlay.classList.remove('show');
        document.body.style.overflow = 'auto';
    };

    hamburger.addEventListener('click', openSidebar);
    closeBtn.addEventListener('click', closeSidebar);
    overlay.addEventListener('click', closeSidebar);

    // --- Dynamic Navbar Actions (Login/Logout) ---
    const navActionsContainer = document.getElementById('nav-actions');
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    if (isLoggedIn) {
        // User is logged in: Show Profile and Logout
        navActionsContainer.innerHTML = `
            <a href="profile.html" class="nav-btn">My Profile</a>
            <button id="logout-btn" class="nav-btn gradient-btn">Logout</button>
        `;

        // Add event listener for the new logout button
        const logoutBtn = document.getElementById('logout-btn');
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('loggedInUser');
            localStorage.removeItem('userProfileData');
            alert('You have been logged out.');
            window.location.href = 'login.html';
        });

    } else {
        // User is not logged in: Show Login and Sign Up
        navActionsContainer.innerHTML = `
            <a href="login.html" class="nav-btn">Login</a>
            <a href="signup.html" class="nav-btn gradient-btn">Sign Up</a>
        `;
    }
});
