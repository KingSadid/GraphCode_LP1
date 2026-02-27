/**
 * GraphCode - Main Application
 * @description Main application controller that orchestrates all modules
 * @version 2.0.0
 */

class App {
  constructor() {
    this.isLoaded = false;
    this.scrollY = 0;
    
    this.init();
  }

  async init() {
    // Wait for DOM
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.onDOMReady());
    } else {
      this.onDOMReady();
    }

    // Wait for full load
    window.addEventListener('load', () => this.onLoad());
  }

  onDOMReady() {
    this.setupLoadingScreen();
    this.setupNavigation();
    this.setupCustomCursor();
    this.setupScrollEffects();
    this.setupPageTransitions();
    this.initAnimations();
  }

  onLoad() {
    // Hide loading screen
    setTimeout(() => {
      this.hideLoadingScreen();
      this.isLoaded = true;
    }, 500);
  }

  /**
   * Setup loading screen
   */
  setupLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    if (!loadingScreen) return;

    // Prevent scroll during loading
    document.body.style.overflow = 'hidden';
  }

  /**
   * Hide loading screen
   */
  hideLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    if (!loadingScreen) return;

    loadingScreen.classList.add('hidden');
    document.body.style.overflow = '';

    // Remove from DOM after animation
    setTimeout(() => {
      loadingScreen.remove();
    }, 500);
  }

  /**
   * Setup navigation
   */
  setupNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    // Navbar scroll effect
    if (navbar) {
      window.addEventListener('scroll', Utils.throttle(() => {
        if (window.scrollY > 50) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
      }, 100));
    }

    // Mobile menu toggle
    if (navToggle && navLinks) {
      navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        navToggle.classList.toggle('active');

        // Animate hamburger
        const spans = navToggle.querySelectorAll('span');
        if (navLinks.classList.contains('active')) {
          spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
          spans[1].style.opacity = '0';
          spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
          spans[0].style.transform = '';
          spans[1].style.opacity = '';
          spans[2].style.transform = '';
        }
      });

      // Close menu on link click
      navLinks.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
          navLinks.classList.remove('active');
          navToggle.classList.remove('active');
          const spans = navToggle.querySelectorAll('span');
          spans[0].style.transform = '';
          spans[1].style.opacity = '';
          spans[2].style.transform = '';
        });
      });
    }

    // Highlight current page
    this.highlightCurrentPage();
  }

  /**
   * Highlight current page in navigation
   */
  highlightCurrentPage() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === currentPage) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  /**
   * Setup custom cursor
   */
  setupCustomCursor() {
    const cursor = document.getElementById('customCursor');
    const cursorDot = document.getElementById('customCursorDot');

    if (!cursor || !cursorDot || Utils.isTouchDevice()) return;

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let dotX = 0, dotY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    // Smooth cursor animation
    const animateCursor = () => {
      // Cursor ring follows with delay
      cursorX += (mouseX - cursorX) * 0.15;
      cursorY += (mouseY - cursorY) * 0.15;
      cursor.style.left = `${cursorX}px`;
      cursor.style.top = `${cursorY}px`;

      // Dot follows immediately
      dotX += (mouseX - dotX) * 0.5;
      dotY += (mouseY - dotY) * 0.5;
      cursorDot.style.left = `${dotX}px`;
      cursorDot.style.top = `${dotY}px`;

      requestAnimationFrame(animateCursor);
    };
    animateCursor();

    // Hover effects
    const hoverElements = document.querySelectorAll('a, button, .glass-card, .pdf-card, .team-card, .social-card');
    hoverElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('hover');
      });
      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
      });
    });

    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
      cursor.style.opacity = '0';
      cursorDot.style.opacity = '0';
    });

    document.addEventListener('mouseenter', () => {
      cursor.style.opacity = '1';
      cursorDot.style.opacity = '1';
    });
  }

  /**
   * Setup scroll effects
   */
  setupScrollEffects() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        if (href === '#') return;

        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });

    // Reveal elements on scroll (fallback for non-GSAP)
    if (typeof gsap === 'undefined') {
      const revealElements = document.querySelectorAll('.reveal');
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('active');
            }
          });
        },
        { threshold: 0.1 }
      );

      revealElements.forEach(el => observer.observe(el));
    }
  }

  /**
   * Setup page transitions
   */
  setupPageTransitions() {
    const links = document.querySelectorAll('a:not([target="_blank"]):not([href^="#"]):not([href^="mailto"]):not([href^="tel"])');

    links.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (!href || href.startsWith('http') || href.startsWith('//')) return;

        e.preventDefault();

        // Page transition animation
        const transition = document.getElementById('pageTransition');
        if (transition && typeof gsap !== 'undefined') {
          gsap.to(transition, {
            scaleY: 1,
            duration: 0.5,
            ease: 'power4.inOut',
            transformOrigin: 'bottom',
            onComplete: () => {
              window.location.href = href;
            }
          });
        } else {
          window.location.href = href;
        }
      });
    });
  }

  /**
   * Initialize animations module
   */
  initAnimations() {
    // Initialize animations controller if GSAP is available
    if (typeof gsap !== 'undefined' && typeof AnimationsController !== 'undefined') {
      window.animationsController = new AnimationsController();
    }
  }
}

// Initialize application
window.app = new App();
