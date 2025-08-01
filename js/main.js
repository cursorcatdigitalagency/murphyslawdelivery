/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/* Menu show */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

/* Menu hidden */
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link')

const linkAction = () =>{
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== ADD BLUR HEADER ===============*/
const blurHeader = () =>{
    const header = document.getElementById('header')
    // Add a class if the bottom offset is greater than 50 of the viewport
    this.scrollY >= 50 ? header.classList.add('scroll-header') 
                       : header.classList.remove('scroll-header')
}
window.addEventListener('scroll', blurHeader)

/*=============== SHOW SCROLL UP ===============*/ 
const scrollUp = () =>{
    const scrollUp = document.getElementById('scroll-up')
    // When the scroll is higher than 350 viewport height, add the show-scroll class to the a tag with the scrollup class
    this.scrollY >= 350 ? scrollUp.classList.add('show-scroll')
                        : scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')
    
const scrollActive = () =>{
    const scrollDown = window.scrollY

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 58,
              sectionId = current.getAttribute('id'),
              sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')

        if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
            sectionsClass.classList.add('active-link')
        }else{
            sectionsClass.classList.remove('active-link')
        }                                                    
    })
}
window.addEventListener('scroll', scrollActive)

/*=============== RATE CALCULATOR ===============*/
const rateData = {
    'Edmonton': 15,
    'Leduc': 14,
    'Calmar': 15,
    'Beaumont': 20,
    'Spruce Grove': 30,
    'Stony Plain': 35,
    'St. Albert': 30
};

const priorityMultipliers = {
    '1': 1,      // Regular
    '1.5': 1.5,  // Rush
    '2': 2,      // Double Rush
    '3': 3       // Direct
};

// Calculator Modal Elements
const calculatorModal = document.getElementById('calculator-modal');
const calculatorClose = document.getElementById('calculator-close');
const quoteBtn = document.getElementById('quote-btn');
const homeQuoteBtn = document.getElementById('home-quote-btn');
const floatingCalcBtn = document.getElementById('floating-calc-btn');
const calculateRateBtn = document.getElementById('calculate-rate');
const calculatorResult = document.getElementById('calculator-result');
const calculatedPrice = document.getElementById('calculated-price');

// Calculator Form Elements
const calcPickup = document.getElementById('calc-pickup');
const calcDelivery = document.getElementById('calc-delivery');
const calcPriority = document.getElementById('calc-priority');

// Show Calculator Modal
const showCalculator = () => {
    calculatorModal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

// Hide Calculator Modal
const hideCalculator = () => {
    calculatorModal.classList.remove('show');
    document.body.style.overflow = 'auto';
    calculatorResult.classList.remove('show');
}

// Event Listeners for Calculator Modal
if(quoteBtn) {
    quoteBtn.addEventListener('click', showCalculator);
}

if(homeQuoteBtn) {
    homeQuoteBtn.addEventListener('click', showCalculator);
}

if(floatingCalcBtn) {
    floatingCalcBtn.addEventListener('click', showCalculator);
}

if(calculatorClose) {
    calculatorClose.addEventListener('click', hideCalculator);
}

// Close modal when clicking outside
calculatorModal.addEventListener('click', (e) => {
    if(e.target === calculatorModal) {
        hideCalculator();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape' && calculatorModal.classList.contains('show')) {
        hideCalculator();
    }
});

// Calculate Rate Function
const calculateRate = () => {
    const pickup = calcPickup.value;
    const delivery = calcDelivery.value;
    const priority = parseFloat(calcPriority.value);

    if(!pickup || !delivery || !priority) {
        alert('Please fill in all fields to calculate the rate.');
        return;
    }

    // Get base rates for pickup and delivery locations
    const pickupRate = rateData[pickup] || 0;
    const deliveryRate = rateData[delivery] || 0;

    // Calculate base rate (higher of the two locations)
    const baseRate = Math.max(pickupRate, deliveryRate);

    // Apply priority multiplier
    const finalRate = baseRate * priority;

    // Display result
    calculatedPrice.textContent = `$${finalRate}`;
    calculatorResult.classList.add('show');

    // Scroll to result
    calculatorResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Calculate Rate Button Event Listener
if(calculateRateBtn) {
    calculateRateBtn.addEventListener('click', calculateRate);
}

// Allow Enter key to calculate rate
[calcPickup, calcDelivery, calcPriority].forEach(element => {
    if(element) {
        element.addEventListener('keydown', (e) => {
            if(e.key === 'Enter') {
                calculateRate();
            }
        });
    }
});

/*=============== CONTACT FORM ===============*/
const contactForm = document.getElementById('contact-form');

if(contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Basic validation
        if(!data.name || !data.email || !data.phone || !data.pickup || !data.delivery || !data.priority) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(data.email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        // Phone validation (basic)
        const phoneRegex = /^[\d\s\-\+\(\)]+$/;
        if(!phoneRegex.test(data.phone)) {
            alert('Please enter a valid phone number.');
            return;
        }
        
        // Calculate estimated rate for the quote
        let estimatedRate = 'Contact for pricing';
        if(rateData[data.pickup] && rateData[data.delivery]) {
            const baseRate = Math.max(rateData[data.pickup], rateData[data.delivery]);
            let multiplier = 1;
            
            switch(data.priority) {
                case 'rush':
                    multiplier = 1.5;
                    break;
                case 'double-rush':
                    multiplier = 2;
                    break;
                case 'direct':
                    multiplier = 3;
                    break;
                default:
                    multiplier = 1;
            }
            
            estimatedRate = `$${baseRate * multiplier}`;
        }
        
        // Create email body
        const emailBody = `
New Quote Request from Murphy's Law Delivery Website

Customer Information:
- Name: ${data.name}
- Email: ${data.email}
- Phone: ${data.phone}

Delivery Details:
- Pickup Location: ${data.pickup}
- Delivery Location: ${data.delivery}
- Priority Level: ${data.priority}
- Estimated Rate: ${estimatedRate}

Additional Details:
${data.message || 'None provided'}

Please contact the customer to confirm the delivery details and schedule the service.
        `.trim();
        
        // Create mailto link
        const mailtoLink = `mailto:kevin@murphyslawdelivery.com?subject=New Quote Request - ${data.name}&body=${encodeURIComponent(emailBody)}`;
        
        // Open email client
        window.location.href = mailtoLink;
        
        // Show success message
        alert('Thank you for your quote request! Your email client should open with the details. You can also call us directly at 403-671-2676.');
        
        // Reset form
        contactForm.reset();
    });
}

/*=============== SMOOTH SCROLLING ===============*/
const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');

smoothScrollLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if(targetSection) {
            const headerHeight = document.getElementById('header').offsetHeight;
            const targetPosition = targetSection.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

/*=============== SCROLL ANIMATIONS ===============*/
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            entry.target.classList.add('animate-on-scroll');
        }
    });
}, observerOptions);

// Observe elements for animation
const animateElements = document.querySelectorAll('.services__card, .areas__item, .why-choose-us__item, .contact__card');
animateElements.forEach(el => observer.observe(el));

/*=============== PHONE NUMBER FORMATTING ===============*/
const phoneInputs = document.querySelectorAll('input[type="tel"]');

phoneInputs.forEach(input => {
    input.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        
        if(value.length >= 6) {
            value = value.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
        } else if(value.length >= 3) {
            value = value.replace(/(\d{3})(\d{3})/, '$1-$2');
        }
        
        e.target.value = value;
    });
});

/*=============== LOADING ANIMATION ===============*/
window.addEventListener('load', () => {
    // Add loaded class to body for any load-specific animations
    document.body.classList.add('loaded');
    
    // Animate hero section elements
    const heroElements = document.querySelectorAll('.home__title, .home__description, .home__slogan, .home__actions, .home__features');
    heroElements.forEach((el, index) => {
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 200);
    });
});

/*=============== PERFORMANCE OPTIMIZATIONS ===============*/
// Lazy loading for images
const images = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

/*=============== ACCESSIBILITY IMPROVEMENTS ===============*/
// Focus management for modal
const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

const trapFocus = (element) => {
    const focusableContent = element.querySelectorAll(focusableElements);
    const firstFocusableElement = focusableContent[0];
    const lastFocusableElement = focusableContent[focusableContent.length - 1];

    document.addEventListener('keydown', (e) => {
        if(e.key === 'Tab') {
            if(e.shiftKey) {
                if(document.activeElement === firstFocusableElement) {
                    lastFocusableElement.focus();
                    e.preventDefault();
                }
            } else {
                if(document.activeElement === lastFocusableElement) {
                    firstFocusableElement.focus();
                    e.preventDefault();
                }
            }
        }
    });

    firstFocusableElement.focus();
};

// Apply focus trap when calculator modal is open
const originalShowCalculator = showCalculator;
showCalculator = () => {
    originalShowCalculator();
    trapFocus(calculatorModal);
};

/*=============== ERROR HANDLING ===============*/
window.addEventListener('error', (e) => {
    console.error('JavaScript Error:', e.error);
    // Could implement error reporting here
});

/*=============== UTILITY FUNCTIONS ===============*/
// Debounce function for performance
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Throttle function for scroll events
const throttle = (func, limit) => {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
};

// Apply throttling to scroll events
window.removeEventListener('scroll', blurHeader);
window.removeEventListener('scroll', scrollUp);
window.removeEventListener('scroll', scrollActive);

window.addEventListener('scroll', throttle(blurHeader, 10));
window.addEventListener('scroll', throttle(scrollUp, 10));
window.addEventListener('scroll', throttle(scrollActive, 10));

/*=============== ANALYTICS HELPERS ===============*/
// Function to track user interactions (ready for Google Analytics)
const trackEvent = (action, category, label) => {
    if(typeof gtag !== 'undefined') {
        gtag('event', action, {
            event_category: category,
            event_label: label
        });
    }
};

// Track calculator usage
if(calculateRateBtn) {
    calculateRateBtn.addEventListener('click', () => {
        trackEvent('calculate_rate', 'engagement', 'rate_calculator');
    });
}

// Track phone clicks
document.querySelectorAll('a[href^="tel:"]').forEach(link => {
    link.addEventListener('click', () => {
        trackEvent('phone_click', 'contact', 'phone_number');
    });
});

// Track email clicks
document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
    link.addEventListener('click', () => {
        trackEvent('email_click', 'contact', 'email_address');
    });
});

/*=============== INITIALIZATION ===============*/
document.addEventListener('DOMContentLoaded', () => {
    // Initialize any components that need DOM to be ready
    console.log('Murphy\'s Law Delivery Service website loaded successfully!');
    
    // Set initial styles for animated elements
    const animatedElements = document.querySelectorAll('.home__title, .home__description, .home__slogan, .home__actions, .home__features');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
});

