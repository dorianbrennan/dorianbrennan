// Theme toggle - site-wide persistence
(function() {
    const themeToggle = document.getElementById('themeToggle');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    updateIcon(theme);
    updatePhoto(theme);  // Add this line
}

function updatePhoto(theme) {
    const photo = document.getElementById('profilePhoto');
    if (photo) {
        if (theme === 'dark') {
            photo.src = photo.src.replace('photo-light.jpeg', 'photo-dark.jpg');
        } else {
            photo.src = photo.src.replace('photo-dark.jpg', 'photo-light.jpeg');
        }
    }
}

    function updateIcon(theme) {
        if (themeToggle) {
            if (theme === 'dark') {
                themeToggle.textContent = '☀';
            } else {
                themeToggle.textContent = '☾';
            }
        }
    }

    function getTheme() {
        const stored = localStorage.getItem('theme');
        if (stored) return stored;
        return prefersDark.matches ? 'dark' : 'light';
    }

    // Apply theme immediately on page load
    const initialTheme = getTheme();
    document.documentElement.setAttribute('data-theme', initialTheme);
    updatePhoto(initialTheme);
    
    // Update icon once DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            updateIcon(initialTheme);
        });
    } else {
        updateIcon(initialTheme);
    }

    // Set up toggle button
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        setTheme(current === 'dark' ? 'light' : 'dark');
        
        // Add pulse animation
        themeToggle.classList.add('pulse');
        setTimeout(() => {
            themeToggle.classList.remove('pulse');
        }, 600);
    });
}
})();
