// Execute when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // ------ Toggle between Work and Play sections ------
    const toggleBtns = document.querySelectorAll('.toggle-btn');
    const sections = document.querySelectorAll('.content-section');

    // Add click event listeners to toggle buttons
    toggleBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update visual state of buttons
            toggleBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Show/hide sections with smooth animation
            const targetId = this.getAttribute('data-target');
            const currentActiveSection = document.querySelector('.content-section.active');
            
            // Don't do anything if clicked on the already active section
            if (currentActiveSection && currentActiveSection.id === targetId) return;
            
            // First, start fading out the current section
            if (currentActiveSection) {
                currentActiveSection.style.opacity = '0';
                currentActiveSection.style.transform = 'translateY(10px)';
            }
            
            // Always add transition class first to ensure smooth animation
            document.body.classList.add('theme-transitioning');
            
            // Unified timing values for both directions
            const themeTransitionDelay = 100;  // Theme change delay
            const contentTransitionDelay = 400; // Content transition delay
            const cleanupDelay = 1000;        // Cleanup delay
            
            // Common transition pattern for both directions
            // Step 1: Handle theme change first
            setTimeout(() => {
                if (targetId === 'play') {
                    document.body.classList.add('light-theme');
                } else {
                    document.body.classList.remove('light-theme');
                }
            }, themeTransitionDelay);
            
            // Step 2: Handle content transition with exactly the same timing
            setTimeout(() => {
                handleContentTransition(currentActiveSection, targetId);
            }, contentTransitionDelay);
            
            // Step 3: Clean up transition class
            setTimeout(() => {
                document.body.classList.remove('theme-transitioning');
            }, cleanupDelay);
        });
    });
    
    // Helper function to handle content transition
    function handleContentTransition(currentActiveSection, targetId) {
        // Hide the previous section
        if (currentActiveSection) {
            currentActiveSection.classList.remove('active');
        }
        
        // Find the target section
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
            // Set up target section for animation (invisible but active)
            targetSection.style.opacity = '0';
            targetSection.style.transform = 'translateY(10px)';
            targetSection.classList.add('active');
            
            // Add a consistent delay before showing the new section content
            setTimeout(() => {
                // Initialize all section headers to be initially hidden with a staggered reveal
                const sectionHeaders = targetSection.querySelectorAll('.section-header');
                sectionHeaders.forEach((header, index) => {
                    header.style.opacity = '0';
                    header.style.transform = 'translateY(20px)';
                    header.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                    
                    // Stagger the appearance of section headers
                    setTimeout(() => {
                        header.style.opacity = '1';
                        header.style.transform = 'translateY(0)';
                    }, 150 + (index * 100)); // Stagger each header by 100ms
                });
                
                // Fade in the main section content
                targetSection.style.opacity = '1';
                targetSection.style.transform = 'translateY(0)';
            }, 100);
        }
    }

    // ------ Animation for items on scroll ------
    const items = document.querySelectorAll('.item');
    
    // Set up intersection observer to detect when items scroll into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const item = entry.target;
                const image = item.querySelector('.item-image');
                const content = item.querySelector('.item-content');
                
                // Stagger animations for better visual effect
                // First animate the image with slight delay
                setTimeout(() => {
                    if (image) {
                        image.style.opacity = '1';
                        image.style.transform = 'translateY(0)';
                    }
                }, 200);
                
                // Then animate the content with additional delay
                setTimeout(() => {
                    if (content) {
                        content.style.opacity = '1';
                        content.style.transform = 'translateY(0)';
                    }
                }, 400);
            }
        });
    }, { 
        threshold: 0.15,      // Trigger when 15% of element is visible
        rootMargin: '-100px 0px',  // Trigger slightly before element comes into view
    });

    // Set initial state for items and observe them
    items.forEach(item => {
        const image = item.querySelector('.item-image');
        const content = item.querySelector('.item-content');
        
        // Set initial hidden state for images
        if (image) {
            image.style.opacity = '0';
            image.style.transform = 'translateY(30px)';
            image.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        }
        
        // Set initial hidden state for content
        if (content) {
            content.style.opacity = '0';
            content.style.transform = 'translateY(30px)';
            content.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        }
        
        // Start observing this item
        observer.observe(item);
    });

    // ------ Smooth scrolling for anchor links with improved easing ------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                // Get distance to scroll
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
                const startPosition = window.pageYOffset;
                const distance = targetPosition - startPosition;
                
                // Add small offset to avoid exact edge positioning
                const offset = -20;
                
                window.scrollTo({
                    top: targetPosition + offset,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add smooth scrolling to regular page navigation (non-anchor links)
    document.addEventListener('wheel', function(e) {
        // Don't interfere with default smooth scrolling, just ensure it's natural
        // e.preventDefault; // This line had an error - it's not calling the function
        // Remove or properly implement preventDefault if needed
    }, { passive: true }); // Using passive to improve scroll performance
});
