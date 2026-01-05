/* ========================================
   Gravic AI - Official Website v6
   Scripts - Optimized
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
  
  initHeader();
  initMobileMenu();
  initSmoothScroll();
  updateYear();
  initScrollAnimations();
  initResizeHandler();
});

/* ============ Header Scroll Effect ============ */
function initHeader() {
  const header = document.getElementById('header');
  if (!header) return;
  
  let ticking = false;
  
  const updateHeader = () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    ticking = false;
  };
  
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateHeader);
      ticking = true;
    }
  }, { passive: true });
  
  updateHeader();
}

/* ============ Mobile Menu ============ */
function initMobileMenu() {
  const btn = document.getElementById('menuBtn');
  const links = document.getElementById('navLinks');
  
  if (!btn || !links) return;
  
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = links.classList.toggle('open');
    btn.classList.toggle('active', isOpen);
  });
  
  links.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      links.classList.remove('open');
      btn.classList.remove('active');
    });
  });
  
  document.addEventListener('click', (e) => {
    if (!btn.contains(e.target) && !links.contains(e.target)) {
      links.classList.remove('open');
      btn.classList.remove('active');
    }
  });
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && links.classList.contains('open')) {
      links.classList.remove('open');
      btn.classList.remove('active');
    }
  });
}

/* ============ Smooth Scroll ============ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      e.preventDefault();
      const id = anchor.getAttribute('href');
      const target = document.querySelector(id);
      
      if (target) {
        const headerHeight = document.getElementById('header')?.offsetHeight || 56;
        const targetPosition = target.offsetTop - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/* ============ Update Year ============ */
function updateYear() {
  const year = new Date().getFullYear();
  document.querySelectorAll('.year').forEach(el => {
    el.textContent = year;
  });
}

/* ============ Scroll Animations ============ */
function initScrollAnimations() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }
  
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -40px 0px',
    threshold: 0.1
  };
  
  const animateOnScroll = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  };
  
  const observer = new IntersectionObserver(animateOnScroll, observerOptions);
  
  const cards = document.querySelectorAll(
    '.about-text-block, .value-card, .whatwedo-card, .scenario-card, .contact-card'
  );
  
  cards.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(16px)';
    el.style.transition = `opacity 0.4s ease ${index % 3 * 0.08}s, transform 0.4s ease ${index % 3 * 0.08}s`;
    observer.observe(el);
  });
}

/* ============ Resize Handler ============ */
function initResizeHandler() {
  let resizeTimeout;
  const links = document.getElementById('navLinks');
  const btn = document.getElementById('menuBtn');
  
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      if (window.innerWidth > 768 && links && btn) {
        links.classList.remove('open');
        btn.classList.remove('active');
      }
    }, 100);
  }, { passive: true });
}

// Inject animation styles
const animStyles = document.createElement('style');
animStyles.textContent = `
  .animate-in {
    opacity: 1 !important;
    transform: translateY(0) !important;
  }
`;
document.head.appendChild(animStyles);
