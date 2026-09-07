/* =========================================================
   AZAMAT RO'ZIBOYEV — PORTFOLIO SCRIPTS
   ========================================================= */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- 1. DARK / LIGHT MODE ---------- */
  const body = document.body;
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');

  function setTheme(isLight) {
    body.classList.toggle('theme-light', isLight);
    body.classList.toggle('theme-dark', !isLight);
    themeIcon.className = isLight ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
  }

  themeToggle.addEventListener('click', function () {
    const isLight = !body.classList.contains('theme-light');
    setTheme(isLight);
  });

  /* ---------- 2. MOBILE HAMBURGER MENU ---------- */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  function closeMobileMenu() {
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileMenu.classList.remove('open');
  }

  hamburger.addEventListener('click', function () {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });

  document.querySelectorAll('.mobile-menu a').forEach(function (link) {
    link.addEventListener('click', closeMobileMenu);
  });

  /* ---------- 3. NAVBAR SCROLL EFFECT ---------- */
  const navbar = document.getElementById('navbar');
  const backToTop = document.getElementById('backToTop');

  function handleScrollEffects() {
    const scrolled = window.scrollY > 40;
    navbar.classList.toggle('scrolled', scrolled);
    backToTop.classList.toggle('show', window.scrollY > 500);
  }

  window.addEventListener('scroll', handleScrollEffects, { passive: true });
  handleScrollEffects();

  /* ---------- 4. BACK TO TOP ---------- */
  backToTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------- 5. SMOOTH SCROLL FOR NAV LINKS ---------- */
  document.querySelectorAll('a[data-nav]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      const targetId = link.getAttribute('href');
      if (targetId.startsWith('#')) {
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          const offset = 76;
          const top = target.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top: top, behavior: 'smooth' });
          closeMobileMenu();
        }
      }
    });
  });

  /* ---------- 6. ACTIVE NAV LINK ON SCROLL ---------- */
  const sections = document.querySelectorAll('main section[id]');
  const navLinkEls = document.querySelectorAll('.nav-link[data-nav]');

  const navObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinkEls.forEach(function (link) {
          link.classList.toggle('active', link.getAttribute('href') === '#' + id);
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });

  sections.forEach(function (section) { navObserver.observe(section); });

  /* ---------- 7. SCROLL REVEAL ANIMATIONS ---------- */
  const revealEls = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealEls.forEach(function (el) { revealObserver.observe(el); });

  /* ---------- 8. CONTACT FORM VALIDATION ---------- */
  const form = document.getElementById('contactForm');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const messageError = document.getElementById('messageError');
  const formSuccess = document.getElementById('formSuccess');

  function validateField(input, errorEl, message, testFn) {
    const value = input.value.trim();
    const isValid = testFn(value);
    input.classList.toggle('invalid', !isValid);
    errorEl.textContent = isValid ? '' : message;
    return isValid;
  }

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  [nameInput, emailInput, messageInput].forEach(function (input) {
    input.addEventListener('input', function () {
      formSuccess.classList.remove('show');
      if (input === nameInput) {
        validateField(nameInput, nameError, "Ismingizni kiriting (kamida 2 ta belgi)", function (v) { return v.length >= 2; });
      } else if (input === emailInput) {
        validateField(emailInput, emailError, "To'g'ri email manzil kiriting", isValidEmail);
      } else {
        validateField(messageInput, messageError, "Xabar kamida 10 ta belgidan iborat bo'lsin", function (v) { return v.length >= 10; });
      }
    });
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const isNameValid = validateField(nameInput, nameError, "Ismingizni kiriting (kamida 2 ta belgi)", function (v) { return v.length >= 2; });
    const isEmailValid = validateField(emailInput, emailError, "To'g'ri email manzil kiriting", isValidEmail);
    const isMessageValid = validateField(messageInput, messageError, "Xabar kamida 10 ta belgidan iborat bo'lsin", function (v) { return v.length >= 10; });

    if (isNameValid && isEmailValid && isMessageValid) {
      formSuccess.classList.add('show');
      form.reset();
      setTimeout(function () { formSuccess.classList.remove('show'); }, 5000);
    }
  });

});
