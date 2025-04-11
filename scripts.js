// Execute when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // ------ Toggle between Work and Play sections ------
    const toggleBtns = document.querySelectorAll('.toggle-btn');
    const sections = document.querySelectorAll('.content-section');
    
    // Animation timing constants (in milliseconds)
    const FADE_OUT_DURATION = 400;  // Section fade out duration
    const SECTION_SWITCH_DELAY = 400; // Delay before switching sections
    const HEADER_STAGGER_DELAY = 100; // Delay between each header animation
    const HEADER_BASE_DELAY = 150;   // Base delay before starting header animations
    
    // Add click event listeners to toggle buttons
    toggleBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Get target section id and current active section
            const targetId = this.getAttribute('data-target');
            const currentActiveSection = document.querySelector('.content-section.active');
            
            // Don't do anything if clicked on the already active section
            if (currentActiveSection && currentActiveSection.id === targetId) return;
            
            // Update visual state of buttons
            toggleBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Step 1: Fade out current section
            if (currentActiveSection) {
                fadeOutSection(currentActiveSection);
            }
            
            // Step 2: After delay, switch sections
            setTimeout(() => {
                switchToSection(currentActiveSection, targetId);
            }, SECTION_SWITCH_DELAY);
        });
    });
    
    // Fade out a section with animation
    function fadeOutSection(section) {
        section.style.opacity = '0';
        section.style.transform = 'translateY(10px)';
    }
    
    // Switch from current section to target section
    function switchToSection(currentSection, targetId) {
        // Hide the previous section
        if (currentSection) {
            currentSection.classList.remove('active');
        }
        
        // Find and setup the target section
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            // Initialize the section for fade-in animation
            targetSection.style.opacity = '0';
            targetSection.style.transform = 'translateY(10px)';
            targetSection.classList.add('active');
            
            // Setup and trigger animations for section headers
            animateSectionHeaders(targetSection);
            
            // Reinitialize animated background if needed
            if (targetId === 'play') {
                if (window.initHeroBackground) {
                    window.initHeroBackground('playHeroBackground');
                }
            }
            
            // Fade in the main section content
            setTimeout(() => {
                targetSection.style.opacity = '1';
                targetSection.style.transform = 'translateY(0)';
            }, 50); // Small delay for smoother appearance
        }
    }
    
    // Animate section headers with staggered timing
    function animateSectionHeaders(section) {
        const sectionHeaders = section.querySelectorAll('.section-header');
        
        // Reset all headers to initial hidden state
        sectionHeaders.forEach((header) => {
            header.style.opacity = '0';
            header.style.transform = 'translateY(20px)';
            header.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });
        
        // Animate each header with staggered timing
        sectionHeaders.forEach((header, index) => {
            setTimeout(() => {
                header.style.opacity = '1';
                header.style.transform = 'translateY(0)';
            }, HEADER_BASE_DELAY + (index * HEADER_STAGGER_DELAY));
        });
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
                
                // Animate image with slight delay
                setTimeout(() => {
                    if (image) {
                        image.style.opacity = '1';
                        image.style.transform = 'translateY(0)';
                    }
                }, 200);
                
                // Animate content with additional delay
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

    // ------ Smooth scrolling for anchor links ------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
                const offset = -20; // Small offset for better positioning
                
                window.scrollTo({
                    top: targetPosition + offset,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Improve scroll performance with passive events
    document.addEventListener('wheel', function() {
        // Using passive event listener for better performance
    }, { passive: true });
});
