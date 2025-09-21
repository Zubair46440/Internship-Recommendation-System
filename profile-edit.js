document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('isLoggedIn') !== 'true') {
        window.location.href = 'login.html';
        return;
    }

    const profileForm = document.getElementById('profile-edit-form');
    const user = JSON.parse(localStorage.getItem('loggedInUser'));
    const savedProfile = JSON.parse(localStorage.getItem('userProfileData'));

    // --- get all inputs ---
    const profileName = document.getElementById('profile-name');
    const profileEmail = document.getElementById('profile-email');
    const profileHeadline = document.getElementById('profile-headline');
    const profileSkills = document.getElementById('profile-skills');
    const profileImage = document.getElementById('profile-image');
    const profileMobile = document.getElementById('profile-mobile');
    const profileCountry = document.getElementById('profile-country');
    const profileState = document.getElementById('profile-state');
    const profileCity = document.getElementById('profile-city');
    const schoolName = document.getElementById('school-name');
    const schoolPercentage = document.getElementById('school-percentage');
    const collegeDegree = document.getElementById('college-degree');
    const collegeName = document.getElementById('college-name');
    const collegeCGPA = document.getElementById('college-cgpa');
    const toolsUsed = document.getElementById('tools-used');

    // --- pre-fill ---
    if (user?.email) profileEmail.value = user.email;
    if (savedProfile) {
        profileName.value = savedProfile.name || user.fullname;
        if(profileHeadline) profileHeadline.value = savedProfile.headline || '';
        profileSkills.value = savedProfile.skills?.join(', ') || '';
        profileMobile.value = savedProfile.mobile || '';
        profileCountry.value = savedProfile.location?.country || '';
        profileState.value = savedProfile.location?.state || '';
        profileCity.value = savedProfile.location?.city || '';
        schoolName.value = savedProfile.school?.name || '';
        schoolPercentage.value = savedProfile.school?.percentage || '';
        collegeDegree.value = savedProfile.college?.degree || '';
        collegeName.value = savedProfile.college?.name || '';
        collegeCGPA.value = savedProfile.college?.cgpa || '';
        toolsUsed.value = savedProfile.tools?.join(', ') || '';
    } else {
        profileName.value = user.fullname;
    }

    // --- form submit ---
    profileForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const resumeFile = document.getElementById('profile-resume')?.files[0];

        const profileData = {
            name: profileName?.value || '',
            headline: profileHeadline?.value || '',
            skills: profileSkills?.value.split(',').map(s => s.trim()).filter(Boolean) || [],
            mobile: profileMobile?.value || '',
            location: {
                country: profileCountry?.value || '',
                state: profileState?.value || '',
                city: profileCity?.value || ''
            },
            school: {
                name: schoolName?.value || '',
                percentage: schoolPercentage?.value || ''
            },
            college: {
                degree: collegeDegree?.value || '',
                name: collegeName?.value || '',
                cgpa: collegeCGPA?.value || ''
            },
            tools: toolsUsed?.value.split(',').map(t => t.trim()).filter(Boolean) || [],
            image: savedProfile?.image || null,
            imageName: savedProfile?.imageName || null,
            resume: savedProfile?.resume || null,
            resumeName: savedProfile?.resumeName || null
        };

        const promises = [];

        if (profileImage?.files[0]) {
            promises.push(new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => {
                    profileData.image = reader.result;
                    profileData.imageName = profileImage.files[0].name;
                    resolve();
                };
                reader.onerror = reject;
                reader.readAsDataURL(profileImage.files[0]);
            }));
        }

        if (resumeFile) {
            promises.push(new Promise((resolve, reject) => {
                const readerResume = new FileReader();
                readerResume.onload = () => {
                    profileData.resume = readerResume.result;
                    profileData.resumeName = resumeFile.name;
                    resolve();
                };
                readerResume.onerror = reject;
                readerResume.readAsDataURL(resumeFile);
            }));
        }

        Promise.all(promises).then(() => {
            localStorage.setItem('userProfileData', JSON.stringify(profileData));
            alert('Profile saved successfully!');
            window.location.href = 'profile.html';
        }).catch(() => {
            alert('Error saving files. Please try again.');
        });
    });
});
