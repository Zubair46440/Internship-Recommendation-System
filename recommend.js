document.addEventListener('DOMContentLoaded', () => {

    // ================== 1. GET USER AND INTERNSHIP DATA ==================
    // Fetch the full internship dataset from data.js (which is loaded before this script)
    const allInternships = internshipData; 

    // Fetch the logged-in user's profile data from localStorage
    const userProfileData = JSON.parse(localStorage.getItem('userProfileData'));
    
    // Set default skills if user has not filled their profile
    const userSkills = (userProfileData && userProfileData.skills) ? userProfileData.skills : ["JavaScript", "HTML"];


    // ================== 2. CORE LOGIC (Functions remain the same) ==================
    function calculateMatch(userSkills, requiredSkills) {
        if (!requiredSkills || requiredSkills.length === 0) return 100;
        const matchedSkills = requiredSkills.filter(skill => 
            userSkills.some(userSkill => skill.toLowerCase() === userSkill.toLowerCase())
        );
        const matchPercentage = (matchedSkills.length / requiredSkills.length) * 100;
        return Math.round(matchPercentage);
    }
    
    function createInternshipCard(internship) {
        let matchClass = 'high';
        if (internship.match < 75) matchClass = 'medium';
        if (internship.match < 50) matchClass = 'low';
        
        return `
            <div class="internship-card">
                <div class="match-percentage ${matchClass}">${internship.match}% Match</div>
                <div class="card-header">
                    <p class="category">${internship.category}</p>
                    <h3 class="title">${internship.title}</h3>
                </div>
                <div class="card-details">
                    <p><i class="fas fa-building"></i> ${internship.company_name}</p>
                    <p><i class="fas fa-map-marker-alt"></i> ${internship.location}</p>
                    <p><i class="fas fa-hand-holding-usd"></i> ${internship.stipend}</p>
                </div>
                <div class="card-footer">
                    <span class="post-date">Posted: ${internship.posted_on}</span>
                    <a href="detail.html?id=${internship.id}" class="nav-btn gradient-btn view-more-btn">View More</a>
                </div>
            </div>
        `;
    }

    // ================== 3. RENDER FUNCTION ==================
    function renderInternships() {
        const recommendedContainer = document.getElementById('recommended-internships');
        const otherContainer = document.getElementById('other-internships');
        
        if (!allInternships || allInternships.length === 0) return;

        const internshipsWithMatch = allInternships.map(internship => {
            // Ensure skills_required is an array before calculating match
            const requiredSkills = Array.isArray(internship.skills_required) 
                ? internship.skills_required 
                : (internship.skills_required || "").split(',').map(s => s.trim());

            return {
                ...internship,
                match: calculateMatch(userSkills, requiredSkills),
                skills_required: requiredSkills // Standardize the skills field
            };
        });

        internshipsWithMatch.sort((a, b) => b.match - a.match);
        
        const topRecommendations = internshipsWithMatch.slice(0, 8); // Show more recommendations
        const otherOpportunities = internshipsWithMatch.slice(8);

        recommendedContainer.innerHTML = topRecommendations.map(createInternshipCard).join('') || "<p>No recommendations found based on your profile.</p>";
        otherContainer.innerHTML = otherOpportunities.map(createInternshipCard).join('') || "<p>No other opportunities available at the moment.</p>";
    }

    renderInternships();
});