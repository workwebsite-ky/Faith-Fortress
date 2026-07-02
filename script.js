/* ================================================
   FAITH FORTRESS CHURCH — SCRIPT.JS
   ================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // === LOADER ===
  const loader = document.getElementById('loader');
  if (loader) {
    window.addEventListener('load', () => {
      setTimeout(() => loader.classList.add('hidden'), 700);
    });
    // Fallback
    setTimeout(() => loader.classList.add('hidden'), 2500);
  }

  // === NAVBAR SCROLL ===
  const navbar = document.getElementById('navbar');
  function handleNavScroll() {
    if (window.scrollY > 60) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();

  // === HAMBURGER MENU ===
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  const btnNav = document.querySelector('.btn-nav');
  hamburger?.addEventListener('click', () => {
    navLinks?.classList.toggle('open');
    const spans = hamburger.querySelectorAll('span');
    if (navLinks?.classList.contains('open')) {
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
  navLinks?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      const spans = hamburger?.querySelectorAll('span');
      if (spans) {
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
      }
    });
  });

  // === BACK TO TOP ===
  const backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTop?.classList.add('visible');
    } else {
      backToTop?.classList.remove('visible');
    }
  }, { passive: true });
  backToTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // === REVEAL ON SCROLL ===
  const reveals = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Stagger siblings
        const siblings = Array.from(entry.target.parentElement.querySelectorAll('.reveal'));
        const idx = siblings.indexOf(entry.target);
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, idx * 80);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  reveals.forEach(el => revealObserver.observe(el));

  // === ANIMATED COUNTERS ===
  const statNums = document.querySelectorAll('.stat-num');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target, 10);
        const duration = 1800;
        const step = target / (duration / 16);
        let current = 0;
        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            el.textContent = target.toLocaleString();
            clearInterval(timer);
          } else {
            el.textContent = Math.floor(current).toLocaleString();
          }
        }, 16);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  statNums.forEach(el => counterObserver.observe(el));

  // === TESTIMONIAL SLIDER ===
  const testiCards = document.querySelectorAll('.testi-card');
  const dots = document.querySelectorAll('.dot');
  let currentSlide = 0;
  let autoSlideTimer;

  function goToSlide(index) {
    testiCards[currentSlide]?.classList.remove('active');
    dots[currentSlide]?.classList.remove('active');
    currentSlide = index;
    testiCards[currentSlide]?.classList.add('active');
    dots[currentSlide]?.classList.add('active');
  }

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      clearInterval(autoSlideTimer);
      goToSlide(parseInt(dot.dataset.index, 10));
      startAutoSlide();
    });
  });

  function startAutoSlide() {
    autoSlideTimer = setInterval(() => {
      const next = (currentSlide + 1) % testiCards.length;
      goToSlide(next);
    }, 5000);
  }
  if (testiCards.length > 0) startAutoSlide();

  // === FAQ ACCORDION ===
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-q');
    btn?.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      // Close all
      faqItems.forEach(i => i.classList.remove('open'));
      // Open this one if it wasn't open
      if (!isOpen) item.classList.add('open');
    });
  });

  // === SMOOTH SCROLL for anchor links ===
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // === CONTACT FORM ===
  const contactForm = document.getElementById('contactForm');
  contactForm?.addEventListener('submit', (e) => {
    // Allow mailto to fire, but show a message
    const btn = contactForm.querySelector('button[type="submit"]');
    if (btn) {
      btn.textContent = 'Opening Mail Client... ✝';
      btn.style.opacity = '0.7';
      setTimeout(() => {
        btn.textContent = 'Send Message ✝';
        btn.style.opacity = '';
      }, 3000);
    }
  });

  // === PARALLAX on hero (subtle) ===
  const heroSection = document.querySelector('.hero');
  if (heroSection) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      const heroBg = heroSection.querySelector('.hero-bg img');
      if (heroBg && scrollY < window.innerHeight) {
        heroBg.style.transform = `scale(1.05) translateY(${scrollY * 0.15}px)`;
      }
    }, { passive: true });
  }

});
