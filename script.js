(function () {
  'use strict';

  document.body.classList.add('js-enabled');

  var revealEls = document.querySelectorAll('header, section, footer');

  revealEls.forEach(function (el, i) {
    el.style.setProperty('--reveal-delay', i * 0.1 + 's');
  });

  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  revealEls.forEach(function (el) { revealObserver.observe(el); });

  var navLinks = document.querySelectorAll('#main-nav a[href^="#"]');
  navLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  var hero = document.getElementById('hero');
  if (hero) {
    var navObserver = new IntersectionObserver(function (entries) {
      document.body.classList.toggle('scrolled', !entries[0].isIntersecting);
    }, { threshold: 0 });
    navObserver.observe(hero);
  }
})();
