// ===== Gold Particle Canvas =====
(function initParticles() {
  var canvas = document.getElementById('heroParticles');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  var particles = [];
  var w, h;
  // Fewer particles on mobile for performance
  var isMobile = window.innerWidth < 768;
  var PARTICLE_COUNT = isMobile ? 30 : 60;

  function resize() {
    w = canvas.width = canvas.offsetWidth;
    h = canvas.height = canvas.offsetHeight;
  }

  function createParticle() {
    return {
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * (isMobile ? 1.5 : 2) + 0.5,
      vx: (Math.random() - 0.5) * 0.3,
      vy: -Math.random() * 0.4 - 0.1,
      alpha: Math.random() * 0.5 + 0.2,
      fade: Math.random() * 0.005 + 0.002
    };
  }

  function init() {
    resize();
    particles = [];
    for (var i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(createParticle());
    }
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    for (var j = 0; j < particles.length; j++) {
      var p = particles[j];
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(212, 175, 55, ' + p.alpha + ')';
      ctx.fill();

      p.x += p.vx;
      p.y += p.vy;
      p.alpha += p.fade;

      if (p.alpha >= 0.7 || p.alpha <= 0.1) {
        p.fade = -p.fade;
      }

      if (p.y < -10 || p.x < -10 || p.x > w + 10) {
        p.x = Math.random() * w;
        p.y = h + 10;
        p.alpha = 0.2;
      }
    }
    requestAnimationFrame(draw);
  }

  var resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      isMobile = window.innerWidth < 768;
      resize();
    }, 150);
  });

  init();
  draw();
})();

// ===== Sticky Header =====
(function initHeader() {
  var header = document.getElementById('header');

  window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });
})();

// ===== Mobile Menu Toggle =====
(function initMenu() {
  var toggle = document.getElementById('menuToggle');
  var nav = document.getElementById('nav');
  var body = document.body;

  toggle.addEventListener('click', function () {
    var isOpen = nav.classList.contains('open');
    toggle.classList.toggle('active');
    nav.classList.toggle('open');
    // Prevent body scroll when menu is open
    if (!isOpen) {
      body.style.overflow = 'hidden';
    } else {
      body.style.overflow = '';
    }
  });

  // Close menu on link click
  var links = nav.querySelectorAll('.nav-link');
  for (var i = 0; i < links.length; i++) {
    links[i].addEventListener('click', function () {
      toggle.classList.remove('active');
      nav.classList.remove('open');
      body.style.overflow = '';
    });
  }

  // Close menu when clicking outside
  document.addEventListener('click', function (e) {
    if (nav.classList.contains('open') &&
        !nav.contains(e.target) &&
        !toggle.contains(e.target)) {
      toggle.classList.remove('active');
      nav.classList.remove('open');
      body.style.overflow = '';
    }
  });
})();

// ===== Scroll Reveal =====
(function initReveal() {
  var reveals = document.querySelectorAll('.reveal');

  // Lower threshold on mobile so elements reveal sooner
  var isMobile = window.innerWidth < 768;
  var observer = new IntersectionObserver(function (entries) {
    for (var i = 0; i < entries.length; i++) {
      if (entries[i].isIntersecting) {
        entries[i].target.classList.add('visible');
        observer.unobserve(entries[i].target);
      }
    }
  }, {
    threshold: isMobile ? 0.08 : 0.15,
    rootMargin: '0px 0px -20px 0px'
  });

  for (var j = 0; j < reveals.length; j++) {
    observer.observe(reveals[j]);
  }
})();

// ===== Smooth scroll for anchor links =====
(function initSmoothScroll() {
  var anchors = document.querySelectorAll('a[href^="#"]');
  for (var i = 0; i < anchors.length; i++) {
    anchors[i].addEventListener('click', function (e) {
      var href = this.getAttribute('href');
      var target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        var headerHeight = document.getElementById('header').offsetHeight;
        var top = target.getBoundingClientRect().top + window.scrollY - headerHeight;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  }
})();
