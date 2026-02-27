/**
 * GraphCode - Advanced Animations Module
 * @description Awwwards-level animations using GSAP with:
 * - Scroll-triggered animations
 * - Parallax effects
 * - Magnetic buttons
 * - Text animations
 * - Page transitions
 * @version 2.0.0
 */

class AnimationsController {
  constructor() {
    this.initGSAP();
    this.initScrollAnimations();
    this.initMagneticButtons();
    this.initTextAnimations();
    this.initParallaxEffects();
    this.initHoverEffects();
  }

  /**
   * Initialize GSAP and ScrollTrigger
   */
  initGSAP() {
    gsap.registerPlugin(ScrollTrigger);

    // Configure default easing
    gsap.defaults({
      ease: 'power3.out',
      duration: 1
    });

    // Refresh ScrollTrigger on load
    window.addEventListener('load', () => {
      ScrollTrigger.refresh();
    });
  }

  /**
   * Initialize scroll-triggered reveal animations
   */
  initScrollAnimations() {
    // Reveal animations (Bottom up)
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach((element, index) => {
      gsap.fromTo(element,
        {
          y: 60,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: index * 0.1,
          scrollTrigger: {
            trigger: element,
            start: 'top 85%',
            end: 'bottom 15%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    // Reveal from left
    const revealLeftElements = document.querySelectorAll('.reveal-left');
    revealLeftElements.forEach((element, index) => {
      gsap.fromTo(element,
        {
          x: -60,
          opacity: 0
        },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          delay: index * 0.1,
          scrollTrigger: {
            trigger: element,
            start: 'top 85%',
            end: 'bottom 15%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    // Reveal from right
    const revealRightElements = document.querySelectorAll('.reveal-right');
    revealRightElements.forEach((element, index) => {
      gsap.fromTo(element,
        {
          x: 60,
          opacity: 0
        },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          delay: index * 0.1,
          scrollTrigger: {
            trigger: element,
            start: 'top 85%',
            end: 'bottom 15%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    // Stagger children animations
    const staggerContainers = document.querySelectorAll('.stagger-children');
    staggerContainers.forEach(container => {
      const children = container.children;
      gsap.fromTo(children,
        {
          y: 40,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          scrollTrigger: {
            trigger: container,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    // Glass cards hover lift
    const glassCards = document.querySelectorAll('.glass-card');
    glassCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          y: -8,
          duration: 0.3,
          ease: 'power2.out'
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          y: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
      });
    });
  }

  /**
   * Initialize magnetic button effect
   */
  initMagneticButtons() {
    const magneticBtns = document.querySelectorAll('.magnetic-btn');

    magneticBtns.forEach(btn => {
      const content = btn.querySelector('.magnetic-btn-content') || btn;
      const strength = 0.3;
      const maxDistance = 100;

      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

        if (distance < maxDistance) {
          const factor = 1 - distance / maxDistance;
          gsap.to(content, {
            x: distanceX * strength * factor,
            y: distanceY * strength * factor,
            duration: 0.3,
            ease: 'power2.out'
          });
        }
      });

      btn.addEventListener('mouseleave', () => {
        gsap.to(content, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: 'elastic.out(1, 0.3)'
        });
      });
    });
  }

  /**
   * Initialize text animations
   */
  initTextAnimations() {
    // Hero title animation
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
      const lines = heroTitle.innerHTML.split('<br>');
      heroTitle.innerHTML = lines.map((line, i) =>
        `<span class="title-line" style="display: block; overflow: hidden;">
          <span class="title-line-inner" style="display: block; transform: translateY(100%);">${line}</span>
        </span>`
      ).join('');

      const titleLines = heroTitle.querySelectorAll('.title-line-inner');

      gsap.to(titleLines, {
        y: 0,
        duration: 1,
        stagger: 0.15,
        delay: 0.5,
        ease: 'power4.out'
      });
    }

    // Gradient text shimmer effect
    const gradientTexts = document.querySelectorAll('.gradient-text');
    gradientTexts.forEach(text => {
      text.style.backgroundSize = '200% 200%';
      gsap.to(text, {
        backgroundPosition: '200% center',
        duration: 3,
        repeat: -1,
        ease: 'none'
      });
    });
  }

  /**
   * Initialize parallax effects
   */
  initParallaxEffects() {
    // Hero parallax
    const hero = document.querySelector('.hero');
    if (hero) {
      const heroContent = hero.querySelector('.hero-content');

      gsap.to(heroContent, {
        y: 100,
        opacity: 0.5,
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: 'bottom top',
          scrub: 1
        }
      });
    }

    // Section parallax backgrounds
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
      gsap.fromTo(section,
        { backgroundPositionY: '0%' },
        {
          backgroundPositionY: '30%',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        }
      );
    });
  }

  /**
   * Initialize hover effects
   */
  initHoverEffects() {
    // Nav links underline animation
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      const underline = link.querySelector('::after') || link;

      link.addEventListener('mouseenter', () => {
        gsap.to(link, {
          color: '#f8fafc',
          duration: 0.3
        });
      });

      link.addEventListener('mouseleave', () => {
        if (!link.classList.contains('active')) {
          gsap.to(link, {
            color: '#94a3b8',
            duration: 0.3
          });
        }
      });
    });

    // PDF cards animation
    const pdfCards = document.querySelectorAll('.pdf-card');
    pdfCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          x: 8,
          duration: 0.3,
          ease: 'power2.out'
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          x: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
      });
    });

    // Team cards image scale
    const teamCards = document.querySelectorAll('.team-card');
    teamCards.forEach(card => {
      const image = card.querySelector('.team-card-image img');
      if (image) {
        card.addEventListener('mouseenter', () => {
          gsap.to(image, {
            scale: 1.1,
            duration: 0.5,
            ease: 'power2.out'
          });
        });

        card.addEventListener('mouseleave', () => {
          gsap.to(image, {
            scale: 1,
            duration: 0.5,
            ease: 'power2.out'
          });
        });
      }
    });
  }

  /**
   * Page transition animation
   */
  static pageTransition(callback) {
    const transition = document.getElementById('pageTransition');
    if (!transition) {
      callback();
      return;
    }

    gsap.timeline()
      .to(transition, {
        scaleY: 1,
        duration: 0.5,
        ease: 'power4.inOut',
        transformOrigin: 'bottom'
      })
      .call(callback)
      .to(transition, {
        scaleY: 0,
        duration: 0.5,
        ease: 'power4.inOut',
        transformOrigin: 'top'
      });
  }

  /**
   * Cinema reveal animation
   */
  static revealCinema(container) {
    gsap.to(container, {
      display: 'grid',
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out'
    });
  }

  /**
   * Cinema hide animation
   */
  static hideCinema(container) {
    gsap.to(container, {
      opacity: 0,
      y: 30,
      duration: 0.5,
      ease: 'power3.in',
      onComplete: () => {
        container.style.display = 'none';
      }
    });
  }

  /**
   * Modal open animation
   */
  static openModal(modal) {
    modal.classList.add('active');

    gsap.fromTo(modal.querySelector('.pdf-modal-content'),
      {
        scale: 0.9,
        opacity: 0
      },
      {
        scale: 1,
        opacity: 1,
        duration: 0.4,
        ease: 'back.out(1.7)'
      }
    );
  }

  /**
   * Modal close animation
   */
  static closeModal(modal) {
    gsap.to(modal.querySelector('.pdf-modal-content'), {
      scale: 0.9,
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => {
        modal.classList.remove('active');
      }
    });
  }

  /**
   * Counter animation
   */
  static animateCounter(element, target) {
    gsap.to(element, {
      innerText: target,
      duration: 2,
      snap: { innerText: 1 },
      ease: 'power1.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        once: true
      }
    });
  }

  /**
   * Typewriter effect
   */
  static typewriter(element, text, speed = 50) {
    element.textContent = '';
    let i = 0;

    const type = () => {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(type, speed);
      }
    };

    type();
  }

  /**
   * Scramble text effect
   */
  static scrambleText(element, finalText, duration = 1) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const originalText = element.textContent;
    let iteration = 0;

    const interval = setInterval(() => {
      element.textContent = finalText
        .split('')
        .map((char, index) => {
          if (index < iteration) {
            return finalText[index];
          }
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join('');

      iteration += 1 / (duration * 30);

      if (iteration >= finalText.length) {
        clearInterval(interval);
        element.textContent = finalText;
      }
    }, 30);
  }
}

// Export for use in other modules
window.AnimationsController = AnimationsController;
