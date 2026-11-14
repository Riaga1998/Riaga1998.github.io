/* Shared behaviour for every page: nav shadow, mobile drawer, scroll reveal. */
(function () {
  var nav = document.getElementById('main-nav');
  if (nav) {
    var onScroll = function () { nav.classList.toggle('scrolled', window.scrollY > 10); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  var burger = document.getElementById('nav-burger');
  var drawer = document.getElementById('nav-drawer');
  var drawerClose = document.getElementById('nav-drawer-close');
  function closeDrawer() { if (drawer) drawer.classList.remove('open'); }
  if (burger && drawer) burger.addEventListener('click', function () { drawer.classList.toggle('open'); });
  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
  if (drawer) {
    drawer.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', closeDrawer); });
  }
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeDrawer(); });

  var items = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('visible'); });
    return;
  }
  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.05 });
  items.forEach(function (el) { obs.observe(el); });
})();
