/**
 * Hero Background Animation
 * Match the floating shapes animation from olivierifrah.com
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize the animations for both sections
  initHeroBackground('heroBackground');
  
  // Create helper function to initialize animation for either hero section
  function initHeroBackground(elementId) {
    const container = document.getElementById(elementId);
    if (!container) return;
    
    // Configuration
    const config = {
      numShapes: 4,              // Number of shapes (fewer = better performance)
      shapeColors: [             // Subtle, low-opacity colors
        'rgba(255, 255, 255, 0.03)', 
        'rgba(255, 255, 255, 0.02)',
        'rgba(240, 240, 255, 0.025)'
      ],
      sizeLimits: {min: 200, max: 500},  // Size range in pixels
      blurAmount: {min: 30, max: 60},    // Blur range in pixels
      moveSpeed: 0.2,                    // Very slow base movement speed
      parallaxFactor: 30,                // How much mouse movement affects shapes
    };
    
    // Track animation state
    let shapes = [];
    let mouseX = 0, mouseY = 0;
    let windowWidth = window.innerWidth;
    let windowHeight = container.offsetHeight;
    let animationActive = true;
    let rafId = null;
    
    // Track mouse position
    document.addEventListener('mousemove', function(e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });
    
    // Create floating shapes
    function createShapes() {
      // Clear any existing shapes
      container.innerHTML = '';
      
      // Create each shape
      for (let i = 0; i < config.numShapes; i++) {
        // Create element
        const shape = document.createElement('div');
        shape.className = 'floating-shape';
        
        // Calculate shape properties
        const size = config.sizeLimits.min + Math.random() * (config.sizeLimits.max - config.sizeLimits.min);
        const blur = config.blurAmount.min + Math.random() * (config.blurAmount.max - config.blurAmount.min);
        const color = config.shapeColors[Math.floor(Math.random() * config.shapeColors.length)];
        
        // Create rounded shape with varied border radius
        const br1 = 30 + Math.random() * 40;
        const br2 = 30 + Math.random() * 40;
        const br3 = 30 + Math.random() * 40;
        const br4 = 30 + Math.random() * 40;
        
        // Apply styles
        shape.style.width = `${size}px`;
        shape.style.height = `${size}px`;
        shape.style.backgroundColor = color;
        shape.style.borderRadius = `${br1}% ${br2}% ${br3}% ${br4}%`;
        shape.style.filter = `blur(${blur}px)`;
        shape.style.position = 'absolute';
        shape.style.willChange = 'transform';
        shape.style.transform = 'translate(-50%, -50%)';
        
        // Add shape to container
        container.appendChild(shape);
        
        // Store shape data for animation
        const depth = 0.3 + Math.random() * 0.7; // Depth factor (0.3 to 1.0)
        const x = Math.random() * windowWidth;
        const y = Math.random() * windowHeight;
        
        shapes.push({
          element: shape,
          x, y,                              // Current position
          baseX: x, baseY: y,                // Original position
          xOffset: 0, yOffset: 0,            // Current offset from mouse
          speed: {
            x: (Math.random() - 0.5) * config.moveSpeed,
            y: (Math.random() - 0.5) * config.moveSpeed
          },
          depth: depth,                      // Z-depth simulation (affects parallax)
          size: size                         // Size of shape
        });
      }
    }
    
    // Animate shapes
    function animateShapes() {
      if (!animationActive) return;
      
      // Calculate center of container for parallax effect
      const rect = container.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      // Calculate mouse offset from center (normalized -1 to 1)
      const normalizedX = ((mouseX - rect.left) / rect.width - 0.5) * 2;
      const normalizedY = ((mouseY - rect.top) / rect.height - 0.5) * 2;
      
      shapes.forEach(shape => {
        // Update position with very slow autonomous movement
        shape.x += shape.speed.x;
        shape.y += shape.speed.y;
        
        // Bounce very gently at edges
        if (shape.x < -shape.size/2 || shape.x > rect.width + shape.size/2) {
          shape.speed.x *= -0.8; // Slow down and reverse
        }
        if (shape.y < -shape.size/2 || shape.y > rect.height + shape.size/2) {
          shape.speed.y *= -0.8; // Slow down and reverse
        }
        
        // Apply parallax effect based on mouse position and shape depth
        const parallaxX = normalizedX * config.parallaxFactor * shape.depth;
        const parallaxY = normalizedY * config.parallaxFactor * shape.depth;
        
        // Apply transform with hardware acceleration
        shape.element.style.transform = `translate3d(${shape.x + parallaxX}px, ${shape.y + parallaxY}px, 0)`;
      });
      
      // Continue animation loop
      rafId = requestAnimationFrame(animateShapes);
    }
    
    // Handle resize
    function handleResize() {
      windowWidth = window.innerWidth;
      windowHeight = container.offsetHeight;
      
      // Adjust shape positions for new dimensions
      shapes.forEach(shape => {
        shape.baseX = Math.random() * windowWidth;
        shape.baseY = Math.random() * windowHeight;
        shape.x = shape.baseX;
        shape.y = shape.baseY;
      });
    }
    
    // Initialize animation
    function init() {
      createShapes();
      animateShapes();
      
      // Handle window resizes
      window.addEventListener('resize', handleResize);
      
      // Optimize performance - pause when not visible
      const observer = new IntersectionObserver((entries) => {
        animationActive = entries[0].isIntersecting;
        
        if (animationActive && !rafId) {
          rafId = requestAnimationFrame(animateShapes);
        } else if (!animationActive && rafId) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
      }, { threshold: 0.1 });
      
      observer.observe(container);
      
      // Pause when tab not visible
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
          animationActive = false;
          if (rafId) {
            cancelAnimationFrame(rafId);
            rafId = null;
          }
        } else {
          animationActive = true;
          if (!rafId) {
            rafId = requestAnimationFrame(animateShapes);
          }
        }
      });
    }
    
    // Start animation
    init();
  }
  
  // Also initialize play section background when that tab is activated
  document.querySelectorAll('.toggle-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      if (this.getAttribute('data-target') === 'play') {
        setTimeout(() => {
          initHeroBackground('playHeroBackground');
        }, 500); // Give time for the section to become visible
      }
    });
  });
});
