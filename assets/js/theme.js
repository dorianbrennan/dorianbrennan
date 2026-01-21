// Theme toggle - site-wide persistence
(function() {
    'use strict';
    
    const themeToggle = document.getElementById('themeToggle');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    
    /**
     * Updates the theme-color meta tag
     * @param {string} theme - Either 'dark' or 'light'
     */
    function updateThemeColor(theme) {
        let metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (!metaThemeColor) {
            metaThemeColor = document.createElement('meta');
            metaThemeColor.setAttribute('name', 'theme-color');
            document.head.appendChild(metaThemeColor);
        }
        metaThemeColor.setAttribute('content', theme === 'dark' ? '#13151a' : '#ffffff');
    }
    
    /**
     * Sets the theme and updates all related UI elements
     * @param {string} theme - Either 'dark' or 'light'
     */
    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        updateIcon(theme);
        updatePhoto(theme);
        updateThemeColor(theme);
    }
    
    /**
     * Updates the profile photo based on theme
     * @param {string} theme - Either 'dark' or 'light'
     */
    function updatePhoto(theme) {
        const photo = document.getElementById('profilePhoto');
        if (photo) {
            const basePath = '/assets/images/';
            const photoFile = theme === 'dark' ? 'photo-dark.jpg' : 'photo-light.jpg';
            photo.src = basePath + photoFile;
        }
    }
    
    /**
     * Updates the theme toggle icon
     * @param {string} theme - Either 'dark' or 'light'
     */
    function updateIcon(theme) {
        if (themeToggle) {
            themeToggle.textContent = theme === 'dark' ? '☀' : '☾';
            themeToggle.setAttribute('aria-label', 
                `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`
            );
        }
    }
    
    /**
     * Gets the current theme from localStorage or system preference
     * @returns {string} The current theme ('dark' or 'light')
     */
    function getTheme() {
        const stored = localStorage.getItem('theme');
        if (stored) return stored;
        return prefersDark.matches ? 'dark' : 'light';
    }
    
    /**
     * Initializes the theme on page load
     */
    function initializeTheme() {
        const initialTheme = getTheme();
        document.documentElement.setAttribute('data-theme', initialTheme);
        updatePhoto(initialTheme);
        updateThemeColor(initialTheme);
        
        // Update icon once DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', function() {
                updateIcon(initialTheme);
            });
        } else {
            updateIcon(initialTheme);
        }
    }
    
    /**
     * Sets up the theme toggle button event listener
     */
    function setupToggleButton() {
        if (themeToggle) {
            themeToggle.addEventListener('click', function() {
                const current = document.documentElement.getAttribute('data-theme');
                const newTheme = current === 'dark' ? 'light' : 'dark';
                setTheme(newTheme);
                
                // Add pulse animation
                themeToggle.classList.add('pulse');
                setTimeout(function() {
                    themeToggle.classList.remove('pulse');
                }, 600);
            });
        }
    }
    
    // Listen for system theme changes
    prefersDark.addEventListener('change', function(e) {
        // Only update if user hasn't manually set a preference
        if (!localStorage.getItem('theme')) {
            setTheme(e.matches ? 'dark' : 'light');
        }
    });
    
    // Initialize
    initializeTheme();
    setupToggleButton();
    
})();
