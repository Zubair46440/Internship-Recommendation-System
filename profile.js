document.addEventListener('DOMContentLoaded', () => {

    if (localStorage.getItem('isLoggedIn') !== 'true') {
        window.location.href = 'login.html';
        return;
    }

    const profileData = JSON.parse(localStorage.getItem('userProfileData'));
    const user = JSON.parse(localStorage.getItem('loggedInUser'));

    // DOM Elements
    const userNameDisplay = document.getElementById('user-name-display');
    const userHeadlineDisplay = document.getElementById('user-headline-display');
    const profileImageDisplay = document.getElementById('user-image-display');
    const profileEmailDisplay = document.getElementById('user-email-display');
    const profileMobileDisplay = document.getElementById('user-mobile-display');
    const profileLocationDisplay = document.getElementById('user-location-display');

    const skillsDisplay = document.getElementById('skills-display');
    const educationDisplay = document.getElementById('education-display');
    const toolsDisplay = document.getElementById('tools-display');
    const resumeDisplay = document.getElementById('resume-display');

    if (profileData) {
        // Name & Headline
        userNameDisplay.textContent = profileData.name || user.fullname;
        userHeadlineDisplay.textContent = profileData.headline || 'Add a headline to stand out!';

        // Image
        profileImageDisplay.src = profileData.image || 'default-avatar.png';

        // Email & Mobile
        profileEmailDisplay.textContent = user.email || '';
        profileMobileDisplay.textContent = profileData.mobile || 'Not provided';

        // Location
        if (profileData.location) {
            const { country, state, city } = profileData.location;
            profileLocationDisplay.textContent = `${city || ''}, ${state || ''}, ${country || ''}`;
        }

        // Skills
        skillsDisplay.innerHTML = '';
        if (profileData.skills && profileData.skills.length) {
            profileData.skills.forEach(skill => {
                const span = document.createElement('span');
                span.className = 'skill-tag';
                span.textContent = skill;
                skillsDisplay.appendChild(span);
            });
        } else skillsDisplay.innerHTML = '<p class="placeholder-text">No skills added yet.</p>';

        // Education
        educationDisplay.innerHTML = '';
        if (profileData.school?.name) {
            educationDisplay.innerHTML += `
                <p><strong>School:</strong> ${profileData.school.name}</p>
                <p><strong>Percentage:</strong> ${profileData.school.percentage || 'N/A'}</p>
            `;
        }
        if (profileData.college?.name) {
            educationDisplay.innerHTML += `
                <p><strong>Degree:</strong> ${profileData.college.degree || 'N/A'}</p>
                <p><strong>College:</strong> ${profileData.college.name}</p>
                <p><strong>CGPA:</strong> ${profileData.college.cgpa || 'N/A'}</p>
            `;
        }

        // Tools
        toolsDisplay.innerHTML = '';
        if (profileData.tools && profileData.tools.length) {
            profileData.tools.forEach(tool => {
                const span = document.createElement('span');
                span.className = 'tool-tag';
                span.textContent = tool;
                toolsDisplay.appendChild(span);
            });
        } else toolsDisplay.innerHTML = '<p class="placeholder-text">No tools added yet.</p>';

        // Resume
        resumeDisplay.innerHTML = '';
        if (profileData.resume) {
            resumeDisplay.innerHTML = `
                <p><strong>${profileData.resumeName || 'resume.pdf'}</strong> is on file.</p>
                <a href="${profileData.resume}" download="${profileData.resumeName || 'resume.pdf'}" class="edit-btn">Download Resume</a>
            `;
        } else resumeDisplay.innerHTML = '<p class="placeholder-text">No resume uploaded.</p>';
    } else {
        // Fallback if profileData not set
        userNameDisplay.textContent = user.fullname || 'User';
        profileEmailDisplay.textContent = user.email || '';
        profileImageDisplay.src = 'default-avatar.png';
        skillsDisplay.innerHTML = '<p class="placeholder-text">No skills added yet.</p>';
        educationDisplay.innerHTML = '<p class="placeholder-text">No education added yet.</p>';
        toolsDisplay.innerHTML = '<p class="placeholder-text">No tools added yet.</p>';
        resumeDisplay.innerHTML = '<p class="placeholder-text">No resume uploaded.</p>';
    }
});
