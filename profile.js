document.addEventListener('DOMContentLoaded', () => {

    // --- AUTHENTICATION CHECK ---
    if (localStorage.getItem('isLoggedIn') !== 'true') {
        window.location.href = 'login.html';
        return; // Stop script execution
    }

    // --- RENDER PROFILE DATA ---
    const profileData = JSON.parse(localStorage.getItem('userProfileData'));
    
    const userNameDisplay = document.getElementById('user-name-display');
    const userHeadlineDisplay = document.getElementById('user-headline-display');
    const skillsDisplay = document.getElementById('skills-display');
    const educationDisplay = document.getElementById('education-display');
    const resumeDisplay = document.getElementById('resume-display');

    if (profileData) {
        // Display Name and Headline
        userNameDisplay.textContent = profileData.name || 'User';
        userHeadlineDisplay.textContent = profileData.headline || 'Add a headline to stand out!';

        // Display Skills
        skillsDisplay.innerHTML = ''; // Clear placeholder
        if (profileData.skills && profileData.skills.length > 0) {
            profileData.skills.forEach(skill => {
                const skillTag = document.createElement('span');
                skillTag.className = 'skill-tag';
                skillTag.textContent = skill;
                skillsDisplay.appendChild(skillTag);
            });
        } else {
            skillsDisplay.innerHTML = '<p class="placeholder-text">No skills added yet.</p>';
        }

        // Display Education
        educationDisplay.innerHTML = ''; // Clear placeholder
        if (profileData.degree && profileData.institution) {
            educationDisplay.innerHTML = `
                <p><strong>${profileData.degree}</strong></p>
                <p>${profileData.institution}</p>
            `;
        } else {
            educationDisplay.innerHTML = '<p class="placeholder-text">No education details added.</p>';
        }

        // Display Resume
        resumeDisplay.innerHTML = ''; // Clear placeholder
        if (profileData.resume) {
            resumeDisplay.innerHTML = `
                <p><strong>${profileData.resumeName || 'resume.pdf'}</strong> is on file.</p>
                <a href="${profileData.resume}" download="${profileData.resumeName || 'resume.pdf'}" class="edit-btn">Download Resume</a>
            `;
        } else {
            resumeDisplay.innerHTML = '<p class="placeholder-text">No resume uploaded.</p>';
        }

    } else {
         // Default state if no profile data exists
         const user = JSON.parse(localStorage.getItem('loggedInUser'));
         userNameDisplay.textContent = user.fullname;
    }


    // --- LOGOUT LOGIC (remains the same) ---
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('loggedInUser');
            // Optional: Clear profile data on logout
            // localStorage.removeItem('userProfileData'); 
            alert("You have been logged out.");
            window.location.href = 'login.html';
        });
    }
});
