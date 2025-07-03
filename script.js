// ================================
// MOBILE MENU FUNCTIONALITY
// ================================
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileNav = document.getElementById('mobile-nav');
    const mobileClose = document.getElementById('mobile-close');
    const mobileLinks = document.querySelectorAll('.mobile-nav a');

    if (mobileMenuBtn && mobileNav) {
        // Open mobile menu
        mobileMenuBtn.addEventListener('click', function() {
            mobileNav.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });

        // Close mobile menu
        function closeMobileMenu() {
            mobileNav.classList.remove('active');
            document.body.style.overflow = 'auto'; // Restore scrolling
        }

        mobileClose.addEventListener('click', closeMobileMenu);

        // Close menu when clicking on links
        mobileLinks.forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });

        // Close menu when clicking outside
        mobileNav.addEventListener('click', function(e) {
            if (e.target === mobileNav) {
                closeMobileMenu();
            }
        });

        // Close menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && mobileNav.classList.contains('active')) {
                closeMobileMenu();
            }
        });
    }
}

// ================================
// SMOOTH SCROLLING NAVIGATION
// ================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ================================
// MOBILE-OPTIMIZED INTERACTIONS
// ================================
function initMobileOptimizations() {
    // Detect if device supports touch
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    if (isTouchDevice) {
        document.body.classList.add('touch-device');

        // Remove hover effects on touch devices and add better touch feedback
        document.querySelectorAll('.feature-card').forEach(card => {
            card.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.99)';
            });

            card.addEventListener('touchend', function() {
                this.style.transform = 'scale(1)';
            });
        });

        // Better touch feedback for buttons
        document.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.98)';
            });

            btn.addEventListener('touchend', function() {
                this.style.transform = 'scale(1)';
            });
        });
    }
}

// ================================
// IMPROVED FORM HANDLING FOR MOBILE
// ================================
function initMobileFormEnhancements() {
    const formInputs = document.querySelectorAll('.form-input, .form-select');

    formInputs.forEach(input => {
        // Better focus handling for mobile
        input.addEventListener('focus', function() {
            // Scroll input into view on mobile
            if (window.innerWidth <= 768) {
                setTimeout(() => {
                    this.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    });
                }, 300); // Delay to account for virtual keyboard
            }
        });

        // Remove transform effects on mobile for better performance
        if (window.innerWidth <= 768) {
            input.addEventListener('focus', function() {
                this.style.transform = 'none';
            });

            input.addEventListener('blur', function() {
                this.style.transform = 'none';
            });
        } else {
            // Keep desktop animations
            input.addEventListener('focus', function() {
                this.style.transform = 'scale(1.02)';
                this.style.transition = 'all 0.3s ease';
            });

            input.addEventListener('blur', function() {
                this.style.transform = 'scale(1)';
            });
        }
    });
}

// ================================
// MOBILE-FRIENDLY FEATURE CARDS
// ================================
function initMobileFeatureCards() {
    document.querySelectorAll('.feature-card').forEach(card => {
        if (window.innerWidth <= 768) {
            // Remove complex hover animations on mobile
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'none';
            });

            card.addEventListener('mouseleave', function() {
                this.style.transform = 'none';
            });

            // Add simple touch feedback instead
            card.addEventListener('touchstart', function() {
                this.style.opacity = '0.9';
                this.style.transition = 'opacity 0.1s ease';
            });

            card.addEventListener('touchend', function() {
                this.style.opacity = '1';
            });
        } else {
            // Keep desktop hover effects
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            });

            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        }
    });
}

// ================================
// MOBILE PERFORMANCE OPTIMIZATIONS
// ================================
function initMobilePerformanceOptimizations() {
    // Disable animations on slower mobile devices
    if (window.innerWidth <= 480 || navigator.hardwareConcurrency <= 2) {
        document.body.classList.add('reduced-motion');

        // Disable heavy animations
        const style = document.createElement('style');
        style.textContent = `
            .reduced-motion * {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
            .reduced-motion .bg-animation::before {
                animation: none !important;
            }
            .reduced-motion .floating-shapes {
                display: none !important;
            }
        `;
        document.head.appendChild(style);
    }

    // Optimize scroll performance on mobile
    let ticking = false;

    function updateOnScroll() {
        if (window.innerWidth > 768) {
            // Only run parallax and complex effects on larger screens
            const scrolled = window.pageYOffset;
            const shapes = document.querySelectorAll('.shape');
            shapes.forEach((shape, index) => {
                const speed = 0.5 + (index * 0.2);
                shape.style.transform = `translateY(${scrolled * speed}px)`;
            });
        }

        // Header background change (works on all devices)
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(15, 23, 42, 0.95)';
        } else {
            header.style.background = 'rgba(15, 23, 42, 0.8)';
        }

        ticking = false;
    }

    function requestScrollUpdate() {
        if (!ticking) {
            requestAnimationFrame(updateOnScroll);
            ticking = true;
        }
    }

    window.addEventListener('scroll', requestScrollUpdate, { passive: true });
}

// ================================
// ENHANCED VIEWPORT HEIGHT FIX FOR MOBILE
// ================================
function setMobileViewportHeight() {
    // Fix for mobile viewport height issues with address bars
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    // Debug log to see what's happening (remove in production)
    console.log(`Viewport height set to: ${window.innerHeight}px, --vh: ${vh}px`);
}

// Initial call
setMobileViewportHeight();

// Update on resize with debounce
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(setMobileViewportHeight, 100);
});

// Update on orientation change with delay
window.addEventListener('orientationchange', () => {
    // Delay to account for mobile browser UI changes
    setTimeout(setMobileViewportHeight, 500);
});

// Additional check for iOS Safari address bar behavior
if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
    // Listen for scroll events to recalculate when address bar shows/hides
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            if (Math.abs(window.innerHeight - document.documentElement.clientHeight) > 50) {
                setMobileViewportHeight();
            }
        }, 150);
    }, { passive: true });

    // Also check when page becomes visible again
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden) {
            setTimeout(setMobileViewportHeight, 100);
        }
    });
}

// ================================
// FORM HANDLING & VALIDATION
// ================================
const form = document.getElementById('demo-form');
const formMessage = document.getElementById('form-message');

function showMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type} show`;
    setTimeout(() => {
        formMessage.classList.remove('show');
    }, 5000);
}

function validateForm(formData) {
    const email = formData.get('email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        showMessage('Please enter a valid email address.', 'error');
        return false;
    }

    return true;
}

form.addEventListener('submit', async function(e) {
    e.preventDefault();

    const formData = new FormData(form);

    if (!validateForm(formData)) {
        return;
    }

    // Add loading state
    form.classList.add('loading');

    try {
        const response = await fetch('https://formspree.io/f/xovwbwlv', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            showMessage('🎉 Demo scheduled! We will get back to you in 24-48 hours.', 'success');
            form.reset();
        } else {
            throw new Error('Form submission failed');
        }
    } catch (error) {
        showMessage('❌ Something went wrong. Please try again later.', 'error');
        console.error('Form submission error:', error);
        form.reset();
    } finally {
        form.classList.remove('loading');
    }
});

// ================================
// ENTRANCE ANIMATIONS ON SCROLL
// ================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// ================================
// ACCESSIBILITY IMPROVEMENTS
// ================================
// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-navigation');
});

// ================================
// RESPONSIVE BREAKPOINT HANDLING
// ================================
function handleResponsiveChanges() {
    const width = window.innerWidth;

    // Reinitialize components when crossing major breakpoints
    if (width <= 768) {
        initMobileFeatureCards();
        initMobileFormEnhancements();
    }

    // Update viewport height
    setMobileViewportHeight();
}

// Debounce resize events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

window.addEventListener('resize', debounce(handleResponsiveChanges, 250));

// ================================
// ERROR HANDLING
// ================================
window.addEventListener('error', function(e) {
    console.error('Application error:', e.error);
    // Could add user-friendly error reporting here
});

// ================================
// UTILITY FUNCTIONS
// ================================
function isMobileDevice() {
    return window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

function isSlowDevice() {
    return navigator.hardwareConcurrency <= 2 || navigator.connection?.effectiveType === 'slow-2g';
}

// ================================
// PRELOADER HANDLING
// ================================
function initPreloader() {
    // Hide any loading spinners or preloaders
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 300);
    }
}

// ================================
// CONTACT FORM ENHANCEMENTS
// ================================
function initContactFormEnhancements() {
    // Auto-resize textarea if you add one later
    const textareas = document.querySelectorAll('textarea');
    textareas.forEach(textarea => {
        textarea.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = this.scrollHeight + 'px';
        });
    });

    // Add character count for form fields if needed
    const emailInput = document.getElementById('email');
    if (emailInput) {
        emailInput.addEventListener('input', function() {
            // Could add email validation feedback here
            const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.value);
            if (this.value.length > 0) {
                this.style.borderColor = isValid ? 'var(--accent)' : '#ef4444';
            } else {
                this.style.borderColor = 'rgba(255, 255, 255, 0.2)';
            }
        });
    }
}

// ================================
// PERFORMANCE MONITORING
// ================================
function initPerformanceMonitoring() {
    // Monitor page load performance
    window.addEventListener('load', function() {
        if ('performance' in window) {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            console.log(`Page loaded in ${loadTime}ms`);

            // If page loads slowly, add reduced motion class
            if (loadTime > 3000) {
                document.body.classList.add('reduced-motion');
            }
        }
    });
}

// ================================
// INITIALIZATION
// ================================
document.addEventListener('DOMContentLoaded', function() {
    // Initialize mobile-specific functionality
    initMobileMenu();
    initMobileOptimizations();
    initMobileFormEnhancements();
    initMobileFeatureCards();
    initMobilePerformanceOptimizations();
    initContactFormEnhancements();
    initPerformanceMonitoring();
    setMobileViewportHeight();

    // Initialize entrance animations
    document.querySelectorAll('.feature-card, .demo-container').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
});

// Initialize on page load
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    initPreloader();
});

// ================================
// SERVICE WORKER REGISTRATION (OPTIONAL)
// ================================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // You can add service worker registration here for PWA functionality
        // navigator.serviceWorker.register('/sw.js');
    });
}