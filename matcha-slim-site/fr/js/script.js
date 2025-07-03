// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for all internal links
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.benefit-card, .step, .testimonial-card');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Floating animation for hero benefits
    const floatingItems = document.querySelectorAll('.floating-item');
    floatingItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.5}s`;
    });
    
    // Header background on scroll
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.background = 'linear-gradient(135deg, rgba(76,175,80,0.95), rgba(46,125,50,0.95))';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = 'linear-gradient(135deg, #4CAF50, #2E7D32)';
            header.style.backdropFilter = 'none';
        }
    });
    
    // Button click animations
    const buttons = document.querySelectorAll('.btn-hero, .btn-purchase');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255,255,255,0.3)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Countdown timer (optional feature)
    function startCountdown() {
        const countdownElement = document.getElementById('countdown');
        if (!countdownElement) return;
        
        let timeLeft = 24 * 60 * 60; // 24 hours in seconds
        
        function updateCountdown() {
            const hours = Math.floor(timeLeft / 3600);
            const minutes = Math.floor((timeLeft % 3600) / 60);
            const seconds = timeLeft % 60;
            
            countdownElement.innerHTML = `
                ${hours.toString().padStart(2, '0')}:
                ${minutes.toString().padStart(2, '0')}:
                ${seconds.toString().padStart(2, '0')}
            `;
            
            if (timeLeft > 0) {
                timeLeft--;
                setTimeout(updateCountdown, 1000);
            }
        }
        
        updateCountdown();
    }
    
    // Start countdown if element exists
    startCountdown();
    
    // Mobile menu toggle (if needed in future)
    function createMobileMenu() {
        const navbar = document.querySelector('.navbar .container');
        const navMenu = document.querySelector('.nav-menu');
        
        // Create hamburger button
        const hamburger = document.createElement('button');
        hamburger.className = 'hamburger';
        hamburger.innerHTML = '☰';
        hamburger.style.display = 'none';
        hamburger.style.background = 'none';
        hamburger.style.border = 'none';
        hamburger.style.color = 'white';
        hamburger.style.fontSize = '1.5rem';
        hamburger.style.cursor = 'pointer';
        
        // Add hamburger to navbar
        navbar.appendChild(hamburger);
        
        // Toggle menu on click
        hamburger.addEventListener('click', function() {
            navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
        });
        
        // Show/hide hamburger based on screen size
        function checkScreenSize() {
            if (window.innerWidth <= 768) {
                hamburger.style.display = 'block';
                navMenu.style.display = 'none';
            } else {
                hamburger.style.display = 'none';
                navMenu.style.display = 'flex';
            }
        }
        
        window.addEventListener('resize', checkScreenSize);
        checkScreenSize();
    }
    
    createMobileMenu();
});

// Add ripple animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .hamburger {
        transition: transform 0.3s ease;
    }
    
    .hamburger:hover {
        transform: scale(1.1);
    }
    
    @media (max-width: 768px) {
        .nav-menu {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: linear-gradient(135deg, #4CAF50, #2E7D32);
            flex-direction: column;
            padding: 1rem;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        }
        
        .nav-menu li {
            margin: 0.5rem 0;
            text-align: center;
        }
    }
`;
document.head.appendChild(style);