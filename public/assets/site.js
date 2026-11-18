/* TB Accounting Services site script: menus, current page, contact scrolling, scroll movement. */
(function () {
  'use strict';
  var d = document;
  var html = d.documentElement;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var header = d.querySelector('.site-header');
  var desktop = window.matchMedia('(min-width: 1100px)');

  /* Current page in the menus */
  var path = location.pathname.replace(/index\.html$/, '');
  if (path.charAt(path.length - 1) !== '/') path += '/';
  d.querySelectorAll('.site-header a[href^="/"]').forEach(function (a) {
    var href = a.getAttribute('href');
    if (href === path) a.setAttribute('aria-current', 'page');
  });
  /* A dropdown's top item is marked when you are on one of its pages (Services or Service Areas) */
  d.querySelectorAll('.nav-list .has-sub').forEach(function (li) {
    var top = li.querySelector('a');
    var href = top && top.getAttribute('href');
    if (href && href !== '/' && path.indexOf(href) === 0) li.classList.add('is-current');
  });

  /* Mobile menu */
  var toggle = d.querySelector('.menu-toggle');
  var menu = d.getElementById('mobile-menu');
  function setMenu(open) {
    if (!toggle || !menu) return;
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    menu.hidden = !open;
    html.classList.toggle('menu-open', open);
  }
  if (toggle && menu) {
    toggle.addEventListener('click', function () { setMenu(toggle.getAttribute('aria-expanded') !== 'true'); });
    desktop.addEventListener && desktop.addEventListener('change', function (e) { if (e.matches) setMenu(false); });
  }

  /* Submenus (desktop dropdown and mobile services list) */
  d.querySelectorAll('.sub-toggle').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = btn.getAttribute('aria-expanded') !== 'true';
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      var target = d.getElementById(btn.getAttribute('aria-controls'));
      var li = btn.closest('li');
      if (li) li.classList.toggle('open', open);
      if (target && target.classList.contains('mobile-sub')) target.hidden = !open;
    });
  });
  function closeDropdowns() {
    d.querySelectorAll('.nav-list .has-sub.open').forEach(function (li) {
      li.classList.remove('open');
      var b = li.querySelector('.sub-toggle');
      if (b) b.setAttribute('aria-expanded', 'false');
    });
  }
  d.addEventListener('click', function (e) { if (!e.target.closest('.has-sub')) closeDropdowns(); });
  d.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeDropdowns();
      if (toggle && toggle.getAttribute('aria-expanded') === 'true') { setMenu(false); toggle.focus(); }
    }
  });

  /* Header shadow once the page scrolls */
  function onScroll() { if (header) header.classList.toggle('is-scrolled', window.scrollY > 8); }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* Every Contact us button lands with the whole form in the middle of the screen */
  function barHeight() { return desktop.matches ? 190 : 150; } /* keep the form clear of the corner where the chat widget's welcome bubble opens */
  function centerForm(smooth) {
    var card = d.querySelector('#contact .form-card') || d.getElementById('contact');
    if (!card) return false;
    var headerH = header ? header.offsetHeight : 0;
    var rect = card.getBoundingClientRect();
    var top = window.scrollY + rect.top;
    var avail = window.innerHeight - headerH - barHeight();
    var y = rect.height <= avail ? top - headerH - (avail - rect.height) / 2 : top - headerH - 12;
    window.scrollTo({ top: Math.max(0, y), behavior: smooth && !reduce ? 'smooth' : 'auto' });
    return true;
  }
  function isContactLink(a) {
    var href = a.getAttribute('href') || '';
    if (href === '#contact') return true;
    if (/#contact$/.test(href)) {
      var p = href.replace(/#contact$/, '') || '/';
      return p === path || p + '/' === path;
    }
    return false;
  }
  d.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a || !isContactLink(a)) return;
    if (!d.getElementById('contact')) return;
    e.preventDefault();
    setMenu(false);
    centerForm(true);
    if (history.replaceState) history.replaceState(null, '', '#contact');
  });
  if (location.hash === '#contact') {
    window.addEventListener('load', function () { setTimeout(function () { centerForm(false); }, 150); });
  }

  /* While the contact form is on screen, the round call and contact buttons step aside so they never sit over the form */
  var formCard = d.querySelector('#contact .form-card');
  if (formCard && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { html.classList.toggle('contact-in-view', en.isIntersecting); });
    }, { threshold: 0.12 }).observe(formCard);
  }

  /* Round call and contact buttons wait until the visitor has scrolled past the hero, so they never cover the hero buttons */
  var hero = d.querySelector('main > section');
  if (hero && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { html.classList.toggle('show-fabs', !en.isIntersecting); });
    }, { threshold: 0 }).observe(hero);
  } else {
    html.classList.add('show-fabs');
  }

  /* Scroll movement: sections settle into place as they come into view */
  if (!reduce && 'IntersectionObserver' in window) {
    var items = d.querySelectorAll('[data-reveal]');
    if (items.length) {
      html.classList.add('reveal-on');
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
      items.forEach(function (el) { io.observe(el); });
    }
  }
})();
