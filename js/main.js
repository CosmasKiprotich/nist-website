document.addEventListener('DOMContentLoaded', function () {

  /* ===== Mobile menu ===== */
  var toggle = document.querySelector('.menu-toggle');
  var nav = document.querySelector('.nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', nav.classList.contains('open'));
    });
  }
  document.querySelectorAll('.nav a').forEach(function (link) {
    link.addEventListener('click', function () {
      if (nav) nav.classList.remove('open');
    });
  });

  /* ===== Header shadow on scroll ===== */
  var header = document.querySelector('.header');
  window.addEventListener('scroll', function () {
    if (header) {
      header.classList.toggle('scrolled', window.scrollY > 20);
    }
  });

  /* ===== Animated counters (hero stats) ===== */
  function animateCounter(el, target, duration) {
    var start = 0;
    var startTime = null;
    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      var value = Math.floor(progress * target);
      el.textContent = value + (el.dataset.suffix || '');
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  var stats = document.querySelectorAll('.stat-card .number');
  if (stats.length) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
          entry.target.dataset.animated = '1';
          var text = entry.target.textContent.trim();
          var num = parseInt(text.replace(/\D/g, ''), 10);
          if (!isNaN(num)) {
            entry.target.dataset.suffix = text.replace(/[0-9]/g, '');
            animateCounter(entry.target, num, 1500);
          }
        }
      });
    }, { threshold: 0.5 });
    stats.forEach(function (s) { observer.observe(s); });
  }

  /* ===== Back to top button ===== */
  var backTop = document.createElement('button');
  backTop.id = 'back-to-top';
  backTop.innerHTML = '↑';
  backTop.setAttribute('aria-label', 'Back to top');
  document.body.appendChild(backTop);

  window.addEventListener('scroll', function () {
    backTop.classList.toggle('show', window.scrollY > 400);
  });
  backTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ===== Smooth scroll for anchor links ===== */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href');
      if (id.length > 1) {
        var target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  /* ===== Program level tabs (programs page) ===== */
  var tabBtns = document.querySelectorAll('.tab-btn');
  var tabPanels = document.querySelectorAll('.tab-panel');
  if (tabBtns.length) {
    tabBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var target = btn.dataset.tab;
        tabBtns.forEach(function (b) { b.classList.remove('active'); });
        tabPanels.forEach(function (p) { p.classList.remove('active'); });
        btn.classList.add('active');
        var panel = document.getElementById(target);
        if (panel) panel.classList.add('active');
      });
    });
  }

  /* ===== Course search / filter (programs page) ===== */
  var searchInput = document.getElementById('course-search');
  if (searchInput) {
    searchInput.addEventListener('input', function () {
      var q = searchInput.value.toLowerCase().trim();
      document.querySelectorAll('.course-item').forEach(function (item) {
        var text = item.textContent.toLowerCase();
        item.style.display = text.includes(q) ? '' : 'none';
      });
    });
  }

  /* ===== Forms with better feedback ===== */
  document.querySelectorAll('form').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = form.querySelector('button[type="submit"]');
      if (btn) {
        var original = btn.textContent;
        btn.textContent = 'Sending...';
        btn.disabled = true;
        setTimeout(function () {
          btn.textContent = '✓ Sent!';
          setTimeout(function () {
            btn.textContent = original;
            btn.disabled = false;
            form.reset();
            alert('Thank you! Your message has been received.\n(This is a demo — connect the form to a real backend later.)');
          }, 800);
        }, 900);
      }
    });
  });

  /* ===== Fade-in on scroll for cards ===== */
  var fadeEls = document.querySelectorAll('.program-card, .feature-item, .news-card, .step, .course-item');
  if (fadeEls.length) {
    var fadeObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.15 });
    fadeEls.forEach(function (el) {
      el.classList.add('fade-up');
      fadeObs.observe(el);
    });
  }

});
