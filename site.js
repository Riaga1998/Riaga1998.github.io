/* Shared behaviour for every page: nav shadow, mobile drawer, scroll reveal, hero terminal, project masonry. */
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
  function setDrawer(open) {
    if (!drawer) return;
    drawer.classList.toggle('open', open);
    if (burger) burger.setAttribute('aria-expanded', open ? 'true' : 'false');
  }
  function closeDrawer() { setDrawer(false); }
  if (burger && drawer) burger.addEventListener('click', function () { setDrawer(!drawer.classList.contains('open')); });
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

/* Home hero terminal: types the lines out once. Skipped entirely (text stays
   as written in the HTML) when the visitor prefers reduced motion. */
(function () {
  var term = document.getElementById('term');
  if (!term) return;
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var jobs = Array.prototype.slice.call(term.querySelectorAll('.t-line')).map(function (line) {
    var nodes = [], walker = document.createTreeWalker(line, NodeFilter.SHOW_TEXT, null), n;
    while ((n = walker.nextNode())) nodes.push({ node: n, text: n.nodeValue });
    return { line: line, nodes: nodes, isOut: line.classList.contains('t-out') };
  });

  /* lock the height first so typing never moves the layout */
  term.style.minHeight = term.offsetHeight + 'px';
  jobs.forEach(function (j) {
    j.nodes.forEach(function (s) { s.node.nodeValue = ''; });
    j.line.style.visibility = 'hidden';
  });

  var cursor = document.createElement('span');
  cursor.className = 't-cur';
  var ji = 0, ni = 0, ci = 0;

  function next() {
    var job = jobs[ji];
    if (!job) return;                       /* finished: cursor keeps blinking */
    if (ni === 0 && ci === 0) { job.line.style.visibility = 'visible'; job.line.appendChild(cursor); }
    var seg = job.nodes[ni];
    if (!seg) { ji++; ni = 0; ci = 0; setTimeout(next, job.isOut ? 380 : 220); return; }
    if (ci < seg.text.length) {
      ci++;
      seg.node.nodeValue = seg.text.slice(0, ci);
      setTimeout(next, job.isOut ? 14 : 55);
    } else { ni++; ci = 0; next(); }
  }
  setTimeout(next, 1200);
})();

/* Projects page: staggered masonry that keeps the HTML (priority) order.
   Each card gets a grid-row span equal to its height; with dense auto-placement the next card
   always lands in the shortest column, so the first cards in the file end up on top. */
(function () {
  var grid = document.querySelector('.proj-grid');
  if (!grid) return;
  var cards = Array.prototype.slice.call(grid.children);
  var unit = 4;                                    /* must match grid-auto-rows in style.css */
  var queued = false;

  function layout() {
    queued = false;
    grid.classList.add('masonry');
    var gap = parseFloat(getComputedStyle(grid).columnGap) || 0;
    cards.forEach(function (c) { c.style.gridRowEnd = 'auto'; });   /* measure natural heights */
    cards.forEach(function (c) {
      var h = c.getBoundingClientRect().height;
      c.style.gridRowEnd = 'span ' + Math.ceil((h + gap) / unit);
    });
  }
  function queue() { if (!queued) { queued = true; requestAnimationFrame(layout); } }

  layout();
  window.addEventListener('resize', queue);
  window.addEventListener('load', queue);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(queue);
})();
