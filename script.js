// ================================================================
// ANTI-INJECTION & CODE PROTECTION
// ================================================================

// Disable right-click context menu
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    return false;
});

// Disable Developer Tools
document.onkeydown = function(e) {
    if (e.key === 'F12' || 
        (e.ctrlKey && e.shiftKey && e.key === 'I') ||
        (e.ctrlKey && e.shiftKey && e.key === 'J') ||
        (e.ctrlKey && e.shiftKey && e.key === 'C')) {
        e.preventDefault();
        return false;
    }
};

// Protect against element inspection
try {
    function disableDebugger() {
        let check = function() { debugger; };
        check.constructor = function() {};
        new Function('debugger')();
    }
} catch (e) {}

// ================================================================
// CROSS-BROWSER & DEVICE COMPATIBILITY
// ================================================================

// Detect device type
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
const isTablet = isMobile && window.innerWidth > 768;
const isDesktop = !isMobile;

// Add device class to body
document.addEventListener('DOMContentLoaded', () => {
    if (isDesktop) document.body.classList.add('device-desktop');
    if (isTablet) document.body.classList.add('device-tablet');
    if (isMobile) document.body.classList.add('device-mobile');
});

// ================================================================
// MOBILE MENU TOGGLE
// ================================================================

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
        }
    });
}

// ================================================================
// REAL-TIME AGE CALCULATOR - DAFI NUR FAJRI
// ================================================================

function calculateAge(birthDate) {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age;
}

// Dafi Nur Fajri birthdate: 4 May 2008
const dafiBirthDate = new Date(2008, 4, 4); // Month is 0-indexed

function updateAge() {
    const age = calculateAge(dafiBirthDate);
    const ageElement = document.getElementById('liveAge');
    if (ageElement) {
        ageElement.textContent = age;
        ageElement.style.animation = 'none';
        setTimeout(() => {
            ageElement.style.animation = 'number-pop 0.5s ease-out';
        }, 10);
    }
}

// Update age when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        updateAge();
    });
} else {
    updateAge();
}

// Update age every day at midnight
function scheduleNextMidnight() {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    
    const timeUntilMidnight = tomorrow - now;
    
    setTimeout(() => {
        updateAge();
        scheduleNextMidnight();
    }, timeUntilMidnight);
}

scheduleNextMidnight();

// ================================================================
// SMOOTH SCROLL ENHANCEMENT
// ================================================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ================================================================
// ADVANCED SCROLL ANIMATIONS WITH INTERSECTION OBSERVER
// ================================================================

const scrollAnimationOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const scrollAnimationObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Add stagger effect
            setTimeout(() => {
                const animationType = entry.target.getAttribute('data-animation');
                
                if (animationType) {
                    entry.target.style.animation = `${animationType} 0.8s ease-out forwards`;
                } else {
                    entry.target.style.animation = 'scroll-fade-in 0.8s ease-out forwards';
                }
            }, index * 100);
            
            scrollAnimationObserver.unobserve(entry.target);
        }
    });
}, scrollAnimationOptions);

// Observe all animatable elements
document.addEventListener('DOMContentLoaded', () => {
    // Add animations to various elements
    document.querySelectorAll('.project-card').forEach((el, idx) => {
        el.setAttribute('data-animation', idx % 2 === 0 ? 'slide-in-left-scroll' : 'slide-in-right-scroll');
        el.style.opacity = '0';
        scrollAnimationObserver.observe(el);
    });

    document.querySelectorAll('.stat-card').forEach((el, idx) => {
        el.setAttribute('data-animation', 'bounce-in');
        el.style.opacity = '0';
        scrollAnimationObserver.observe(el);
    });

    document.querySelectorAll('.skill-item').forEach((el, idx) => {
        el.setAttribute('data-animation', idx % 2 === 0 ? 'rotate-in' : 'zoom-in-scroll');
        el.style.opacity = '0';
        scrollAnimationObserver.observe(el);
    });

    document.querySelectorAll('.contact-card').forEach((el, idx) => {
        el.setAttribute('data-animation', 'zoom-in-scroll');
        el.style.opacity = '0';
        scrollAnimationObserver.observe(el);
    });
});

// ================================================================
// ACTIVE NAV LINK ON SCROLL
// ================================================================

window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.style.color = 'var(--accent)';
        } else {
            link.style.color = 'var(--text-light)';
        }
    });
});

// ================================================================
// PARALLAX EFFECT FOR HERO SECTION
// ================================================================

const hero = document.querySelector('.hero');
if (hero) {
    window.addEventListener('scroll', () => {
        if (window.innerWidth > 768) { // Only on desktop
            const scrollPosition = window.scrollY;
            const stars = hero.querySelector('.stars');
            if (stars) {
                stars.style.transform = `translateY(${scrollPosition * 0.5}px)`;
            }
        }
    }, { passive: true });
}

// ================================================================
// BUTTON RIPPLE EFFECT
// ================================================================

document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function (e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const ripple = document.createElement('span');
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// ================================================================
// ADD DYNAMIC STYLES FOR RIPPLE & ENHANCEMENTS
// ================================================================

const dynamicStyles = document.createElement('style');
dynamicStyles.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }

    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }

    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }

    .project-link, .contact-link {
        position: relative;
        display: inline-block;
        text-decoration: none;
        overflow: hidden;
    }

    .project-link::after, .contact-link::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 0;
        height: 2px;
        background: var(--accent-2);
        transition: width 0.3s ease;
    }

    .project-link:hover::after, .contact-link:hover::after {
        width: 100%;
    }

    /* Ensure icons display properly across devices */
    .contact-card i, .project-header i {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    /* Prevent text selection on interactive elements */
    .btn, .tag, .skill-tags span {
        user-select: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
    }
`;
document.head.appendChild(dynamicStyles);

// ================================================================
// TAG INTERACTIVE EFFECTS
// ================================================================

document.querySelectorAll('.tag, .skill-tags span').forEach(tag => {
    tag.addEventListener('mouseenter', function() {
        this.style.background = 'rgba(0, 212, 255, 0.4)';
        this.style.transform = 'scale(1.1)';
        this.style.transition = 'all 0.3s ease';
    });

    tag.addEventListener('mouseleave', function() {
        this.style.background = 'rgba(135, 206, 235, 0.2)';
        this.style.transform = 'scale(1)';
    });

    // Touch support for mobile
    tag.addEventListener('touchstart', function() {
        this.style.background = 'rgba(0, 212, 255, 0.4)';
        this.style.transform = 'scale(1.1)';
    });

    tag.addEventListener('touchend', function() {
        this.style.background = 'rgba(135, 206, 235, 0.2)';
        this.style.transform = 'scale(1)';
    });
});

// ================================================================
// ENHANCED CONTACT NOTIFICATIONS
// ================================================================

document.querySelectorAll('.contact-link').forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href && (href.startsWith('mailto:') || href.startsWith('https://wa.me'))) {
            showNotification('📨 Menghubungi Dafi...');
        }
    });
});

function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: linear-gradient(135deg, #87CEEB, #00d4ff);
        color: #0a1428;
        padding: 15px 25px;
        border-radius: 50px;
        box-shadow: 0 5px 20px rgba(0, 212, 255, 0.4);
        font-weight: 600;
        z-index: 10000;
        animation: slideInUp 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transition = 'opacity 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ================================================================
// RESPONSIVE ADJUSTMENTS
// ================================================================

function adjustResponsive() {
    const width = window.innerWidth;
    const root = document.documentElement;
    
    if (width < 480) {
        root.style.fontSize = '12px';
    } else if (width < 768) {
        root.style.fontSize = '14px';
    } else {
        root.style.fontSize = '16px';
    }
}

window.addEventListener('resize', adjustResponsive, { passive: true });
document.addEventListener('DOMContentLoaded', adjustResponsive);
adjustResponsive();

// ================================================================
// LAZY LOAD OPTIMIZATION
// ================================================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    observer.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// ================================================================
// PREVENT SOURCE CODE COPYING
// ================================================================

document.addEventListener('copy', (e) => {
    e.preventDefault();
    return false;
});

document.addEventListener('cut', (e) => {
    e.preventDefault();
    return false;
});

// ================================================================
// PERFORMANCE OPTIMIZATION
// ================================================================

// Defer non-critical operations
window.addEventListener('load', () => {
    if (window.performance && window.performance.timing) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    }
});

// ================================================================
// TOUCH SUPPORT FOR INTERACTIVE ELEMENTS
// ================================================================

document.querySelectorAll('.project-card, .contact-card, .stat-card').forEach(card => {
    card.addEventListener('touchstart', function() {
        this.style.transform = 'translateY(-5px)';
    });

    card.addEventListener('touchend', function() {
        this.style.transform = 'translateY(0)';
    });
});

// ================================================================
// INITIALIZATION
// ================================================================

window.addEventListener('load', () => {
    adjustResponsive();
    updateAge();
    
    // Trigger animations on page load
    setTimeout(() => {
        document.querySelectorAll('[data-animation]').forEach(el => {
            if (el.style.opacity === '0') {
                el.style.opacity = '1';
            }
        });
    }, 100);
});

