// Execute when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // SEO Enhancement: Track user engagement for better analytics
    trackUserEngagement();
    
    // Add detection for mouse vs. keyboard navigation for accessibility
    document.body.classList.add('using-mouse');
    
    // Remove the 'using-mouse' class when Tab key is used (keyboard navigation)
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.remove('using-mouse');
        }
    });
    
    // Add the 'using-mouse' class back when mouse is used
    document.addEventListener('mousedown', function() {
        document.body.classList.add('using-mouse');
    });
    
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
        // Add ARIA attributes
        btn.setAttribute('role', 'tab');
        btn.setAttribute('aria-selected', btn.classList.contains('active') ? 'true' : 'false');
        
        // Add keyboard event listener
        btn.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
        
        btn.addEventListener('click', function() {
            // Get target section id and current active section
            const targetId = this.getAttribute('data-target');
            const currentActiveSection = document.querySelector('.content-section.active');
            
            // Don't do anything if clicked on the already active section
            if (currentActiveSection && currentActiveSection.id === targetId) return;
            
            // Update visual state of buttons
            toggleBtns.forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-selected', 'false'); // Update aria-selected
            });
            this.classList.add('active');
            this.setAttribute('aria-selected', 'true'); // Update aria-selected
            
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
            
            // Reinitialize animated background if needed - Removed call to undefined function
            // if (targetId === 'play') {
            //     if (window.initHeroBackground) {
            //         window.initHeroBackground('playHeroBackground');
            //     }
            // }
            
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
                
                // Animate image 
                if (image) {
                    image.style.opacity = '1';
                    image.style.transform = 'translateY(0)';
                }
                
                // Animate content with slight delay
                setTimeout(() => {
                    if (content) {
                        content.style.opacity = '1';
                        content.style.transform = 'translateY(0)';
                    }
                }, 200); // Delay content animation slightly after image starts

                // Stop observing the item once it has been animated
                observer.unobserve(item); 
            }
        });
    }, { 
        threshold: 0.15,      // Trigger when 15% of element is visible
        rootMargin: '-50px 0px',  // Trigger slightly before element comes into view (reduced margin)
    });

    // Set initial state for items (moved to CSS) and observe them
    items.forEach(item => {
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

    // Handle image loading
    const images = document.querySelectorAll('.placeholder-image');
    images.forEach(img => {
        // Function to handle loaded state
        const handleLoad = () => {
            img.classList.add('loaded');
            const placeholder = img.closest('.image-placeholder');
            if (placeholder) {
                placeholder.classList.add('loaded');
            }
        };

        // Check if image is already loaded (cached)
        if (img.complete) {
            handleLoad();
        } else {
            // When image loads, add loaded class
            img.addEventListener('load', handleLoad);
        }
        
        // Add error handling
        img.addEventListener('error', function() {
            // Find parent placeholder and add error class
            const placeholder = this.closest('.image-placeholder');
            if (placeholder) {
                placeholder.classList.add('error');
                // Optionally hide the broken image icon or show alternative text
            }
        });
    });

    // SEO Enhancement: Function to track user engagement
    function trackUserEngagement() {
        // Track time on page
        let startTime = new Date();
        window.addEventListener('beforeunload', function() {
            let endTime = new Date();
            let timeSpent = (endTime - startTime) / 1000;
            
            // This would typically send to an analytics system
            // console.log('Time spent on page: ' + timeSpent + ' seconds'); 
        });
        
        // Track scroll depth
        let maxScroll = 0;
        let scrollTracked = false; // Flag to track if 50% scroll depth reached
        window.addEventListener('scroll', function() {
            // Calculate how far down the page the user has scrolled
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            let scrollHeight = document.documentElement.scrollHeight;
            let clientHeight = document.documentElement.clientHeight;
            
            // Avoid division by zero if scrollHeight equals clientHeight
            if (scrollHeight - clientHeight <= 0) return;

            let scrolled = (scrollTop / (scrollHeight - clientHeight)) * 100;
            if (scrolled > maxScroll) {
                maxScroll = scrolled;
            }

            // Example: Track when user scrolls past 50% (only once)
            if (!scrollTracked && maxScroll >= 50) {
                // console.log('User scrolled past 50%');
                // Send event to analytics here
                scrollTracked = true; 
            }

        }, { passive: true }); // Use passive listener for scroll
    }
});
