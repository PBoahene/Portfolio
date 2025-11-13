/* script.js — development version (readable)
   Handles mobile nav, smooth scroll, active link highlighting, and contact form submission to serverless endpoints.
*/
document.addEventListener('DOMContentLoaded', function () {
  const navToggle = document.getElementById('navToggle');
  const navList = document.querySelector('.nav-list');
  const navLinks = document.querySelectorAll('.nav-link');
  const themeToggle = document.getElementById('themeToggle');

  // Theme toggle functionality
  const currentTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(currentTheme);

  themeToggle.addEventListener('click', function () {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
  });

  function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    if (theme === 'light') {
      icon.classList.remove('fa-moon');
      icon.classList.add('fa-sun');
    } else {
      icon.classList.remove('fa-sun');
      icon.classList.add('fa-moon');
    }
  }

  // Mobile nav toggle
  navToggle.addEventListener('click', function () {
    const isOpen = navList.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', isOpen);
  });

  // Close menu when clicking a nav link (mobile)
  navLinks.forEach(link => {
    link.addEventListener('click', function () {
      navList.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Smooth-scrolling for internal anchors
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href && href.length > 1) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({behavior: 'smooth', block: 'start'});
        }
      }
    });
  });

  // Active link highlighting using IntersectionObserver
  const sections = document.querySelectorAll('main section[id]');
  const observerOptions = { root: null, rootMargin: '0px', threshold: 0.55 };

  function onIntersect(entries) {
    entries.forEach(entry => {
      const id = entry.target.getAttribute('id');
      const link = document.querySelector('.nav-link[href="#' + id + '"]');
      if (entry.isIntersecting) {
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        if (link) link.classList.add('active');
      }
    });
  }

  const observer = new IntersectionObserver(onIntersect, observerOptions);
  sections.forEach(sec => observer.observe(sec));

  // Contact form: POST to serverless endpoint. Provide a graceful fallback.
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = {
        name: form.name.value.trim(),
        email: form.email.value.trim(),
        message: form.message.value.trim()
      };

      // Choose endpoint: Vercel: /api/sendEmail, Netlify: /.netlify/functions/sendEmail
      const endpoints = ['/api/sendEmail', '/.netlify/functions/sendEmail', '/api/send'];
      let success = false;
      for (const ep of endpoints) {
        try {
          const res = await fetch(ep, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
          });
          if (res.ok) {
            const json = await res.json().catch(()=>({ok:true}));
            alert(json.message || 'Thanks — your message has been sent.');
            form.reset();
            success = true;
            break;
          }
        } catch (err) {
          // try the next endpoint
        }
      }

      if (!success) {
        // Fallback: local demo
        alert('Thanks — your message has been noted (demo). For real delivery, configure a serverless email function.');
        form.reset();
      }
    });
  }
});
