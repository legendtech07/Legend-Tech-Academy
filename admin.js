// Generate a unique token with timestamp
function generateToken() {
    return 'tk_' + Math.random().toString(36).substr(2, 9) + 
           '_' + Date.now().toString(36);
}

document.addEventListener('DOMContentLoaded', function() {
    // Check if already logged in
    if (sessionStorage.getItem('adminLoggedIn') === 'true') {
        showAdminContent();
    }
    
    // Login functionality
    document.getElementById('login-btn').addEventListener('click', function() {
        const password = document.getElementById('admin-password').value;
        const errorElement = document.getElementById('login-error');
        
        if (password === 'LEGEND') {
            sessionStorage.setItem('adminLoggedIn', 'true');
            errorElement.classList.add('hidden');
            showAdminContent();
        } else {
            errorElement.classList.remove('hidden');
        }
    });
    
    // Logout functionality
    document.getElementById('logout-btn').addEventListener('click', function() {
        sessionStorage.removeItem('adminLoggedIn');
        window.location.reload();
    });
    
    // Link generation
    document.getElementById('generate-btn').addEventListener('click', function() {
        const courseId = document.getElementById('course-select').value;
        const expiryDays = parseInt(document.getElementById('expiry-days').value);
        const token = generateToken();
        
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + expiryDays);
        
        const link = `${window.location.origin}/learn.html?id=${courseId}&token=${token}`;
        
        const linkContainer = document.getElementById('generated-link-container');
        const linkInput = document.getElementById('generated-link');
        const copySuccess = document.getElementById('copy-success');
        
        linkInput.value = link;
        linkContainer.classList.remove('hidden');
        copySuccess.classList.add('hidden');
        
        addLinkToTable(courseId, link, expiryDate);
    });
    
    // Copy link button
    document.getElementById('copy-btn').addEventListener('click', function() {
        const linkInput = document.getElementById('generated-link');
        const copySuccess = document.getElementById('copy-success');
        
        linkInput.select();
        document.execCommand('copy');
        
        copySuccess.classList.remove('hidden');
        setTimeout(() => copySuccess.classList.add('hidden'), 2000);
    });
});

function showAdminContent() {
    document.getElementById('login-section').classList.add('hidden');
    document.getElementById('admin-content').classList.remove('hidden');
}

function addLinkToTable(courseId, link, expiryDate) {
    const linksList = document.getElementById('links-list');
    const row = document.createElement('tr');
    
    const courseName = document.getElementById('course-select')
        .options[document.getElementById('course-select').selectedIndex].text;
    
    row.innerHTML = `
        <td>${courseName}</td>
        <td class="link-cell"><a href="${link}" target="_blank">View Link</a></td>
        <td>${expiryDate.toLocaleDateString()}</td>
    `;
    
    linksList.prepend(row);
}