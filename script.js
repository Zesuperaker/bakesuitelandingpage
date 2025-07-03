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
// HEADER SCROLL EFFECTS
// ================================
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(15, 23, 42, 0.95)';
    } else {
        header.style.background = 'rgba(15, 23, 42, 0.8)';
    }
});

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
// INTERACTIVE CARD EFFECTS
// ================================
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ================================
// PARALLAX EFFECTS FOR SHAPES
// ================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const shapes = document.querySelectorAll('.shape');

    shapes.forEach((shape, index) => {
        const speed = 0.5 + (index * 0.2);
        shape.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ================================
// FORM INPUT ANIMATIONS
// ================================
document.querySelectorAll('.form-input, .form-select').forEach(input => {
    input.addEventListener('focus', function() {
        this.style.transform = 'scale(1.02)';
        this.style.transition = 'all 0.3s ease';
    });

    input.addEventListener('blur', function() {
        this.style.transform = 'scale(1)';
    });
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

// Initialize entrance animations
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.feature-card, .demo-container').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
});

// ================================
// PERFORMANCE OPTIMIZATIONS
// ================================
// Throttle scroll events for better performance
function throttle(func, wait) {
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

// Apply throttling to scroll events
const throttledScrollHandler = throttle(() => {
    // Header background change
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(15, 23, 42, 0.95)';
    } else {
        header.style.background = 'rgba(15, 23, 42, 0.8)';
    }

    // Parallax effects
    const scrolled = window.pageYOffset;
    const shapes = document.querySelectorAll('.shape');
    shapes.forEach((shape, index) => {
        const speed = 0.5 + (index * 0.2);
        shape.style.transform = `translateY(${scrolled * speed}px)`;
    });
}, 16); // ~60fps

window.addEventListener('scroll', throttledScrollHandler);

// ================================
// UTILITY FUNCTIONS
// ================================
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
// ERROR HANDLING
// ================================
window.addEventListener('error', function(e) {
    console.error('Application error:', e.error);
    // Could add user-friendly error reporting here
});

// ================================
// PRELOADER (OPTIONAL)
// ================================
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// ================================
// CONTACT FORM ENHANCEMENTS
// ================================
// Auto-resize textarea if you add one later
function autoResize(textarea) {
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
}

// ================================
// MOBILE MENU (IF NEEDED LATER)
// ================================
function initMobileMenu() {
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initMobileMenu);