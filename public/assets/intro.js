/* Opening animation for TB Accounting Services.
   Loaded in the head of every page. It only adds classes: the overlay itself is plain HTML and CSS,
   hidden unless this script runs, and its CSS animation fades it out on its own after about 2.4 seconds,
   so the page is never blocked if anything later fails. Skipped entirely with prefers-reduced-motion.
   Plays on the first page of each visit (per browser tab session), not on every click between pages. */
(function () {
  var html = document.documentElement;
  html.classList.add('js');
  try {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    try {
      if (window.sessionStorage.getItem('tb-intro-seen') === '1') return;
      window.sessionStorage.setItem('tb-intro-seen', '1');
    } catch (e) { /* storage blocked: still play once for this page view */ }
    html.classList.add('intro');
    var finished = false;
    var events = ['click', 'keydown', 'touchstart', 'wheel'];
    var finish = function () {
      if (finished) return;
      finished = true;
      html.classList.remove('intro', 'intro-skip');
      events.forEach(function (ev) { document.removeEventListener(ev, skip, true); });
    };
    var skip = function () {
      if (finished) return;
      html.classList.add('intro-skip');
      setTimeout(finish, 260);
    };
    events.forEach(function (ev) { document.addEventListener(ev, skip, { capture: true, passive: true }); });
    setTimeout(finish, 2600);
  } catch (e) {
    html.classList.remove('intro');
  }
})();
