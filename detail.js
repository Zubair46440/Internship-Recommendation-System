document.addEventListener('DOMContentLoaded', () => {
    // Safety Check: Ensure the main data variable is loaded before running any code.
    if (typeof internshipData === 'undefined' || !Array.isArray(internshipData)) {
        console.error("CRITICAL ERROR: internshipData is not loaded. Make sure data.js is linked correctly in your HTML file before detail.js.");
        document.querySelector('.detail-container').innerHTML = "<h1 style='color: red;'>Error: Could not load internship data.</h1>";
        return; // Stop the script immediately
    }

    // ================== 1. GET DATA AND URL PARAMS (IMPROVED) ==================
    const allInternships = internshipData;
    const userProfileData = JSON.parse(localStorage.getItem('userProfileData'));
    const userSkills = (userProfileData && Array.isArray(userProfileData.skills)) ? userProfileData.skills : [];

    // Get the internship ID from the URL
    const params = new URLSearchParams(window.location.search);
    const internshipIdFromUrl = params.get('id');
    
    // --- DEBUGGING LOGS ---
    // These will appear in your browser's developer console (Press F12)
    console.log("Attempting to find internship with ID from URL:", internshipIdFromUrl);

    // Find the internship using a more robust, non-strict (==) comparison.
    // This correctly matches a number ID (like 25) with a string ID (like "25").
    const internship = allInternships.find(item => item.id == internshipIdFromUrl);
    
    console.log("Found internship object:", internship); // Should show the object, or 'undefined' if not found.


    // ================== 2. POPULATE THE PAGE WITH DATA ==================
    if (internship) {
        // This part of the code remains the same as it was correct.
        document.getElementById('internship-title').textContent = internship.title || 'N/A';
        document.getElementById('company-name').textContent = internship.company_name || 'N/A';
        document.getElementById('location').textContent = internship.location || 'N/A';
        document.getElementById('stipend').textContent = internship.stipend || 'N/A';
        document.getElementById('duration').textContent = internship.duration || 'N/A';
        document.getElementById('apply-by').textContent = internship.apply_by || 'N/A';
        document.getElementById('company-name-about').textContent = internship.company_name || 'N/A';
        document.getElementById('company-about').textContent = internship.company_about || 'No company description provided.';
        document.getElementById('internship-description').textContent = internship.internship_description || 'No internship description provided.';

        const skillsContainer = document.getElementById('skills-required');
        skillsContainer.innerHTML = ''; 
        
        const requiredSkills = Array.isArray(internship.skills_required) ? internship.skills_required : [];

        if (requiredSkills.length > 0) {
            requiredSkills.forEach(skill => {
                const skillTag = document.createElement('span');
                skillTag.className = 'skill-tag';
                if (userSkills.some(userSkill => userSkill.toLowerCase() === skill.toLowerCase())) {
                    skillTag.classList.add('user-has');
                }
                skillTag.textContent = skill;
                skillsContainer.appendChild(skillTag);
            });
        } else {
            skillsContainer.innerHTML = '<p>No specific skills listed.</p>';
        }
        
        setupAIFeature(requiredSkills);

    } else {
        // This is the block that was incorrectly being triggered.
        console.error("MATCH FAILED: Could not find an internship with ID:", internshipIdFromUrl, "in the dataset."); // DEBUGGING
        document.querySelector('.detail-container').innerHTML = '<h1>Internship Not Found</h1><p>The internship you are looking for may have expired or the link is incorrect.</p>';
    }
    
    // ================== 3. AI FEATURE: "SEE WHERE YOU LACK" ==================
    // ================== 3. AI FEATURE: "SEE WHERE YOU LACK" ==================
    function setupAIFeature(requiredSkills) {
        const lackSkillsBtn = document.getElementById('lack-skills-btn');
        const modalOverlay = document.getElementById('skills-modal-overlay');
        const closeModalBtn = document.getElementById('close-modal-btn');
        const lackingSkillsList = document.getElementById('modal-lacking-skills-list');

        // --- FIX & DEBUGGING ---
        // Add checks to ensure all required elements were found in the HTML.
        if (!lackSkillsBtn) {
            console.error("DEBUG: The button with id 'lack-skills-btn' was NOT found. Check your detail.html file.");
            return; 
        }
        if (!modalOverlay || !closeModalBtn || !lackingSkillsList) {
             console.error("DEBUG: One or more modal elements (overlay, close button, or list) were NOT found. Check your detail.html for the modal structure.");
            return; // Stop if the modal is incomplete
        }
        // --- END FIX ---

        const showModal = () => modalOverlay.classList.add('show');
        const hideModal = () => modalOverlay.classList.remove('show');

        lackSkillsBtn.addEventListener('click', () => {
            console.log("DEBUG: 'See Where You Lack' button clicked."); // For easier debugging
            const missingSkills = requiredSkills.filter(skill => 
                !userSkills.some(userSkill => userSkill.toLowerCase() === skill.toLowerCase())
            );
            
            lackingSkillsList.innerHTML = ''; 

            if (missingSkills.length > 0) {
                missingSkills.forEach(skill => {
                    lackingSkillsList.innerHTML += `
                        <div class="lacking-skill-item">
                            <span>${skill}</span>
                            <a href="https://www.youtube.com/results?search_query=learn+${encodeURIComponent(skill)}+tutorial" target="_blank" class="youtube-link">
                                <i class="fab fa-youtube"></i> Watch Tutorial
                            </a>
                        </div>
                    `;
                });
            } else {
                lackingSkillsList.innerHTML = `<p style="font-weight: 500; color: #166534;">Great news! Your profile shows you have all the required skills for this role.</p>`;
            }
            showModal();
        });

        closeModalBtn.addEventListener('click', hideModal);
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) hideModal();
        });
    }
});
