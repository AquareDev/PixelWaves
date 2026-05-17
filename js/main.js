/* =============================================================
   Pixel Waves — IT Consulting
   js/main.js  —  UI interactions (nav, scroll reveal, filters)
   ============================================================= */

/* ─── NAV: shadow on scroll ─── */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});


/* ─── SCROLL REVEAL ─── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 60);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


/* ─── SERVICE CARD FILTER ─── */
/**
 * Filter service cards by category.
 * @param {string} cat  - Category key or 'all'
 * @param {HTMLElement} btn - The pill button that was clicked
 */
function filterCards(cat, btn) {
  /* Toggle active pill */
  document.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
  btn.classList.add('active');

  /* Show / hide cards */
  document.querySelectorAll('.svc-card').forEach(card => {
    const matches = cat === 'all' || card.dataset.cat === cat;

    card.style.transition = 'opacity 0.3s, transform 0.3s';

    if (matches) {
      card.style.display    = '';
      /* Trigger reflow so the transition fires after display:'' */
      void card.offsetWidth;
      card.style.opacity    = '1';
      card.style.transform  = '';
    } else {
      card.style.opacity   = '0';
      card.style.transform = 'scale(0.95)';
      setTimeout(() => {
        if (card.style.opacity === '0') card.style.display = 'none';
      }, 300);
    }
  });
}


/* ─── INIT ─── */
document.addEventListener('DOMContentLoaded', () => {
  initEmailJS();   // from contact.js
  applyLang('es'); // from i18n.js — default language
});
