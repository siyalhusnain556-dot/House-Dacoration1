// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Hero Slider
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
}

function changeSlide(direction) {
    showSlide(currentSlide + direction);
}

// Auto-advance hero slider
setInterval(() => {
    changeSlide(1);
}, 5000);

// Products Slider
const productsSlider = document.querySelector('.products-slider');
let isDown = false;
let startX;
let scrollLeft;

productsSlider.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX - productsSlider.offsetLeft;
    scrollLeft = productsSlider.scrollLeft;
});

productsSlider.addEventListener('mouseleave', () => {
    isDown = false;
});

productsSlider.addEventListener('mouseup', () => {
    isDown = false;
});

productsSlider.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - productsSlider.offsetLeft;
    const walk = (x - startX) * 2;
    productsSlider.scrollLeft = scrollLeft - walk;
});

// Final Slider
let currentFinalSlide = 0;
const finalSlides = document.querySelectorAll('.final-slide');

function showFinalSlide(index) {
    finalSlides.forEach(slide => slide.classList.remove('active'));
    currentFinalSlide = (index + finalSlides.length) % finalSlides.length;
    finalSlides[currentFinalSlide].classList.add('active');
}

// Auto-advance final slider
setInterval(() => {
    showFinalSlide(currentFinalSlide + 1);
}, 4000);

// Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});

// Smooth Scrolling for Navigation Links
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

// Add to Cart Functionality
document.querySelectorAll('.btn-add-cart').forEach(button => {
    button.addEventListener('click', function() {
        // Add animation
        this.style.transform = 'scale(0.95)';
        this.textContent = 'Added!';
        this.style.background = 'linear-gradient(45deg, #4CAF50, #45a049)';
        
        setTimeout(() => {
            this.style.transform = 'scale(1)';
            this.textContent = 'Add to Cart';
            this.style.background = 'linear-gradient(45deg, var(--primary-color), var(--secondary-color))';
        }, 1500);
        
        // Add ripple effect
        const ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255,255,255,0.6)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s linear';
        ripple.style.left = '50%';
        ripple.style.top = '50%';
        ripple.style.width = '20px';
        ripple.style.height = '20px';
        ripple.style.marginLeft = '-10px';
        ripple.style.marginTop = '-10px';
        
        this.style.position = 'relative';
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple animation to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Navbar Background on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }
});

// Loading Animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Interactive Hover Effects
document.querySelectorAll('.service-card, .product-card, .testimonial-card, .team-member, .blog-card, .contact-item').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Dynamic Gradient Backgrounds
const gradients = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
];

document.querySelectorAll('.section').forEach((section, index) => {
    section.style.background = gradients[index % gradients.length];
});

// Parallax Effect for Hero Slider
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroSlider = document.querySelector('.hero-slider');
    if (heroSlider) {
        heroSlider.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Counter Animation for Statistics (if added)
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.ceil(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    
    updateCounter();
}

// Initialize counters when they come into view
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseInt(entry.target.getAttribute('data-target'));
            animateCounter(entry.target, target);
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

// Add this to your HTML if you want counters:
// <div class="counter" data-target="1000">0</div>
// document.querySelectorAll('.counter').forEach(counter => {
//     counterObserver.observe(counter);
// });