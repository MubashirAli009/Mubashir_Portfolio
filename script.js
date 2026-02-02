// ============================================
// SMOOTH SCROLLING FUNCTION
// ============================================
function scrollToSection(id) {
  const element = document.getElementById(id);
  if (element) {
    const offset = 80; // Account for fixed navbar
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
  
  // Close mobile menu if open
  const navMenu = document.getElementById('navMenu');
  const hamburger = document.getElementById('hamburger');
  if (navMenu && navMenu.classList.contains('active')) {
    navMenu.classList.remove('active');
    hamburger.classList.remove('active');
  }
}

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 100) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  
  lastScroll = currentScroll;
});

// ============================================
// MOBILE MENU TOGGLE
// ============================================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger && navMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  // Close menu when clicking on a link
  const navLinks = navMenu.querySelectorAll('a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    }
  });
}

// ============================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ============================================
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Optional: Unobserve after animation to improve performance
      // observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all elements with fade-in class
document.addEventListener('DOMContentLoaded', () => {
  const fadeElements = document.querySelectorAll('.fade-in');
  fadeElements.forEach(el => {
    observer.observe(el);
  });
});

// ============================================
// ACTIVE NAVIGATION LINK HIGHLIGHTING
// ============================================
const sections = document.querySelectorAll('.section, .hero');
const navLinks = document.querySelectorAll('.nav-menu a');

window.addEventListener('scroll', () => {
  let current = '';
  const scrollPosition = window.pageYOffset + 150;

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// ============================================
// CUSTOM CURSOR (smooth + color changes on hover/section)
// ============================================
(() => {
  const supportsFinePointer =
    window.matchMedia &&
    window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  const dot = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  if (!supportsFinePointer || !dot || !ring) return;

  document.body.classList.add('has-custom-cursor');

  // Smooth follow (ring lags behind dot)
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;

  const setPos = (el, x, y) => {
    el.style.transform = `translate3d(${x}px, ${y}px, 0) translate3d(-50%, -50%, 0)`;
  };

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    setPos(dot, mouseX, mouseY);
  }, { passive: true });

  const tick = () => {
    ringX += (mouseX - ringX) * 0.14;
    ringY += (mouseY - ringY) * 0.14;
    setPos(ring, ringX, ringY);
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);

  // Hover states
  const setCursorColor = (token) => {
    const map = {
      blue: '96 165 250',
      cyan: '34 211 238',
      purple: '167 139 250',
      pink: '244 114 182',
      orange: '251 146 60',
      green: '74 222 128',
      white: '255 255 255',
    };
    document.documentElement.style.setProperty('--cursor-color', map[token] || map.blue);
  };

  const hoverables = document.querySelectorAll('[data-cursor], a, button, .stat-card, .project-card, .service-card, .skill-card, .contact-card');
  hoverables.forEach((el) => {
    el.addEventListener('mouseenter', () => {
      document.body.classList.add('cursor-hover');
      const token = el.getAttribute('data-cursor');
      if (token) setCursorColor(token);
    });
    el.addEventListener('mouseleave', () => {
      document.body.classList.remove('cursor-hover');
    });
  });

  window.addEventListener('mousedown', () => document.body.classList.add('cursor-down'));
  window.addEventListener('mouseup', () => document.body.classList.remove('cursor-down'));

  // Section-based color (when not hovering)
  const sectionColor = {
    home: 'blue',
    about: 'purple',
    skills: 'cyan',
    projects: 'pink',
    experience: 'orange',
    freelance: 'green',
    contact: 'blue',
  };

  const updateFromScroll = () => {
    if (document.body.classList.contains('cursor-hover')) return;
    let current = 'home';
    const y = window.pageYOffset + 150;
    document.querySelectorAll('section[id], .hero').forEach((section) => {
      const id = section.getAttribute('id') || 'home';
      const top = section.offsetTop;
      const height = section.clientHeight;
      if (y >= top && y < top + height) current = id;
    });
    setCursorColor(sectionColor[current] || 'blue');
  };

  window.addEventListener('scroll', updateFromScroll, { passive: true });
  updateFromScroll();
})();

// ============================================
// SMOOTH SCROLL FOR ALL ANCHOR LINKS
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#' && href.length > 1) {
      e.preventDefault();
      const targetId = href.substring(1);
      scrollToSection(targetId);
    }
  });
});

// ============================================
// FORM HANDLING (if needed in future)
// ============================================
const footerForm = document.querySelector('.footer-form');
if (footerForm) {
  const formButton = footerForm.querySelector('.btn');
  if (formButton) {
    formButton.addEventListener('click', (e) => {
      e.preventDefault();
      const nameInput = footerForm.querySelector('input[type="text"]');
      const emailInput = footerForm.querySelector('input[type="email"]');
      
      if (nameInput && emailInput) {
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        
        if (name && email) {
          // Create mailto link
          const subject = encodeURIComponent(`Contact from ${name}`);
          const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n`);
          window.location.href = `mailto:mubashirali432102@gmail.com?subject=${subject}&body=${body}`;
          
          // Reset form
          nameInput.value = '';
          emailInput.value = '';
        } else {
          alert('Please fill in both name and email fields.');
        }
      }
    });
  }
}

// ============================================
// CARD HOVER EFFECTS ENHANCEMENT
// ============================================
document.querySelectorAll('.stat-card, .project-card, .service-card, .contact-card, .skill-card').forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.transition = 'all 0.4s ease';
  });
});

// ============================================
// LOADING ANIMATION
// ============================================
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
  
  // Trigger initial animations
  const heroElements = document.querySelectorAll('.hero-content > *');
  heroElements.forEach((el, index) => {
    setTimeout(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, index * 100);
  });
});

// ============================================
// KEYBOARD NAVIGATION SUPPORT
// ============================================
document.addEventListener('keydown', (e) => {
  // ESC key closes mobile menu
  if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
    navMenu.classList.remove('active');
    if (hamburger) hamburger.classList.remove('active');
  }
});

// ============================================
// PERFORMANCE: THROTTLE SCROLL EVENTS
// ============================================
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
const throttledScroll = throttle(() => {
  // Scroll-based animations here
}, 10);

window.addEventListener('scroll', throttledScroll);

// ============================================
// CONSOLE MESSAGE
// ============================================
console.log('%c👋 Hello! Thanks for checking out my portfolio!', 'color: #60a5fa; font-size: 16px; font-weight: bold;');
console.log('%c💼 Interested in working together?', 'color: #a78bfa; font-size: 14px;');
console.log('%c📧 Email: mubashirali432102@gmail.com', 'color: #94a3b8; font-size: 12px;');
