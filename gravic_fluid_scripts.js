/* ========================================
   GravicAI Group - EdTech Website v6
   Smooth Scroll + Performance Optimized
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initMobileMenu();
  initSmoothScroll();
  updateYear();
});

/* ============ Header 滚动效果（节流优化） ============ */
function initHeader() {
  const header = document.querySelector('.header');
  if (!header) return;
  
  let ticking = false;
  let lastScrollY = 0;
  
  const updateHeader = () => {
    if (lastScrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    ticking = false;
  };
  
  window.addEventListener('scroll', () => {
    lastScrollY = window.scrollY;
    
    if (!ticking) {
      requestAnimationFrame(updateHeader);
      ticking = true;
    }
  }, { passive: true });
}

/* ============ 移动端菜单 ============ */
function initMobileMenu() {
  const btn = document.querySelector('.menu-btn');
  const links = document.querySelector('.nav-links');
  
  if (!btn || !links) return;
  
  btn.addEventListener('click', () => {
    const isOpen = links.classList.toggle('open');
    
    const spans = btn.querySelectorAll('span');
    if (isOpen) {
      spans[0].style.transform = 'rotate(45deg) translate(4px, 4px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(4px, -4px)';
    } else {
      spans.forEach(s => {
        s.style.transform = 'none';
        s.style.opacity = '1';
      });
    }
  });
  
  // 点击链接关闭菜单
  links.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      links.classList.remove('open');
      btn.querySelectorAll('span').forEach(s => {
        s.style.transform = 'none';
        s.style.opacity = '1';
      });
    });
  });
  
  // 点击外部关闭
  document.addEventListener('click', (e) => {
    if (!btn.contains(e.target) && !links.contains(e.target)) {
      links.classList.remove('open');
      btn.querySelectorAll('span').forEach(s => {
        s.style.transform = 'none';
        s.style.opacity = '1';
      });
    }
  });
}

/* ============ 平滑滚动（原生优化） ============ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      e.preventDefault();
      const id = anchor.getAttribute('href');
      const target = document.querySelector(id);
      
      if (target) {
        const headerHeight = document.querySelector('.header')?.offsetHeight || 70;
        const targetPosition = target.offsetTop - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/* ============ 更新年份 ============ */
function updateYear() {
  const year = new Date().getFullYear();
  document.querySelectorAll('.year').forEach(el => {
    el.textContent = year;
  });
}
