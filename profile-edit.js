document.addEventListener('DOMContentLoaded', () => {
    // Authentication Check: Redirect if not logged in
    if (localStorage.getItem('isLoggedIn') !== 'true') {
        window.location.href = 'login.html';
        return;
    }

    const profileForm = document.getElementById('profile-edit-form');
    const user = JSON.parse(localStorage.getItem('loggedInUser'));
    
    // --- Pre-fill form with existing data ---
    const profileName = document.getElementById('profile-name');
    const profileEmail = document.getElementById('profile-email');
    const profileHeadline = document.getElementById('profile-headline');
    const profileSkills = document.getElementById('profile-skills');
    const profileDegree = document.getElementById('profile-education-degree');
    const profileInstitution = document.getElementById('profile-education-institution');

    // Pre-fill email and disable it
    if (user && user.email) {
        profileEmail.value = user.email;
    }
    
    // Load the rest of the profile data
    const savedProfile = JSON.parse(localStorage.getItem('userProfileData'));
    if (savedProfile) {
        profileName.value = savedProfile.name || user.fullname;
        profileHeadline.value = savedProfile.headline || '';
        profileSkills.value = savedProfile.skills ? savedProfile.skills.join(', ') : '';
        profileDegree.value = savedProfile.degree || '';
        profileInstitution.value = savedProfile.institution || '';
    } else {
        profileName.value = user.fullname;
    }

    // --- Form submission logic ---
    profileForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const resumeFile = document.getElementById('profile-resume').files[0];

        const profileData = {
            name: profileName.value,
            headline: profileHeadline.value,
            // Split skills string into an array, trimming whitespace
            skills: profileSkills.value.split(',').map(skill => skill.trim()).filter(skill => skill),
            degree: profileDegree.value,
            institution: profileInstitution.value,
            resume: savedProfile ? savedProfile.resume : null // Keep old resume if new one isn't uploaded
        };

        // Handle file upload using FileReader
        if (resumeFile) {
            const reader = new FileReader();
            reader.readAsDataURL(resumeFile); // Converts file to a Base64 string
            reader.onload = () => {
                profileData.resume = reader.result;
                profileData.resumeName = resumeFile.name; // Store the file name
                saveProfileAndRedirect(profileData);
            };
            reader.onerror = () => {
                alert('Error reading file.');
            };
        } else {
            saveProfileAndRedirect(profileData);
        }
    });
});

function saveProfileAndRedirect(data) {
    localStorage.setItem('userProfileData', JSON.stringify(data));
    alert('Profile saved successfully!');
    window.location.href = 'profile.html';
}
