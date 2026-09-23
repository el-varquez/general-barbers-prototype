/* Demo chrome for the clickable mock: beat counter, prev/next, theme swap, phone frame for mobile screens,
   and the walkthrough aside beside the phone. Included by every screen; not part of the product itself. */
(function () {
  var STOPS = [
    ['mobile/launch.card.html',            0,  'Launch'],
    ['mobile/welcome.card.html',           1,  'Welcome'],
    ['mobile/sign-in.card.html',           2,  'Sign in'],
    ['mobile/home.card.html',              3,  'Home'],
    ['mobile/branch.card.html',            4,  'Select branch'],
    ['mobile/barbers.card.html',           5,  'Select barber'],
    ['mobile/barber-profile.card.html',    6,  'Barber profile'],
    ['mobile/cuts.card.html',              7,  'Select cut'],
    ['mobile/custom-cut.card.html',        7,  'Custom cut'],
    ['mobile/time-slot.card.html',         8,  'Pick a time'],
    ['mobile/checkout.card.html',          9,  'Checkout and downpayment'],
    ['mobile/qr-status.card.html',         10, 'QR code and live status'],
    ['desktop/front-desk-scan.card.html',  11, 'Front desk: check in'],
    ['mobile/qr-in-queue.card.html',       11, 'Customer: in the queue'],
    ['mobile/barber-my-chair.card.html',   12, 'Barber: my chair'],
    ['mobile/barber-scan.card.html',       12, 'Barber: scan at the chair'],
    ['mobile/barber-booking.card.html',    13, 'Barber: start the cut'],
    ['mobile/barber-done.card.html',       14, 'Barber: mark as done'],
    ['mobile/qr-cut-done.card.html',       15, 'Customer: settle at the front desk'],
    ['desktop/live-queue.card.html',       16, 'Front desk: live queue'],
    ['mobile/review.card.html',            17, 'Rate the barber'],
    ['mobile/barber-reviews.card.html',    18, 'Barber: my reviews'],
    ['desktop/dashboard.card.html',        19, 'The owner’s dashboard'],
    ['desktop/users-roles.card.html',      20, 'Users and roles']
  ];
  var BAR_H = 40;
  /* ?embed=1 marks a screen mounted as a figure inside a slide — shown, not driven:
     no demo bar, no phone frame. */
  if (/[?&]embed=1/.test(location.search)) return;
  var parts = location.pathname.split('/').filter(Boolean);
  var here = decodeURIComponent(parts.slice(-2).join('/'));
  var isMobile = here.indexOf('mobile/') === 0;
  var idx = STOPS.findIndex(function (s) { return s[0] === here; });
  var root = document.documentElement;
  /* On a phone the app is the whole screen: no bezel, no bar. The in-app pull tab carries the controls. */
  var onPhone = window.matchMedia('(max-width: 720px)').matches;

  /* --- theme, persisted across screens; a page that declares its own theme keeps it --- */
  var declaredTheme = root.getAttribute('data-theme');
  var storedTheme = localStorage.getItem('gb-demo-theme');
  if (storedTheme && !declaredTheme) root.setAttribute('data-theme', storedTheme);

  /* screen name for off-walkthrough screens: the @dsCard comment ahead of the doctype */
  function cardLabel() {
    for (var i = 0; i < document.childNodes.length; i++) {
      var n = document.childNodes[i];
      if (n.nodeType !== 8 || n.nodeValue.indexOf('@dsCard') < 0) continue;
      var name = /name="([^"]+)"/.exec(n.nodeValue);
      var group = /group="([^"]+)"/.exec(n.nodeValue);
      if (name) return (group ? group[1] + ' — ' : '') + name[1];
      if (group) return group[1];
    }
    return document.title || 'not in the walkthrough';
  }

  function href(path) { return '../' + path; }

  var css = document.createElement('style');
  css.textContent = [
    '.dmb{position:fixed;left:0;right:0;bottom:0;height:' + BAR_H + 'px;z-index:9999;',
    'display:flex;align-items:center;gap:10px;padding:0 12px;box-sizing:border-box;',
    'background:var(--surface);border-top:1px solid var(--border);font:var(--fs-sm)/1 var(--font-ui);color:var(--text);white-space:nowrap}',
    '.dmb a,.dmb button{font:inherit;color:inherit;height:26px;box-sizing:border-box;',
    'display:inline-flex;align-items:center;gap:6px;padding:0 9px;border:1px solid var(--border-strong);',
    'border-radius:6px;background:var(--surface);text-decoration:none;cursor:pointer}',
    '.dmb a:hover,.dmb button:hover:not(:disabled){background:var(--surface-hover);text-decoration:none;color:var(--text)}',
    '.dmb button:disabled{opacity:.4;cursor:not-allowed}',
    '.dmb .dmb-nav{width:26px;padding:0;justify-content:center}',
    '.dmb .dmb-plain{border:0;background:none;padding:0;cursor:default;color:var(--text-muted)}',
    '.dmb b{font-weight:var(--fw-medium);color:var(--text)}',
    '.dmb .dmb-count{font-variant-numeric:tabular-nums;color:var(--text-faint);letter-spacing:.04em;',
    'text-transform:uppercase;font-size:var(--fs-xs)}',
    '.dmb-stage{display:flex;align-items:center;justify-content:center;gap:28px;',
    'height:calc(100vh - ' + BAR_H + 'px);padding:0 24px;box-sizing:border-box}',
    '.dmb-frame{width:390px;height:min(812px,calc(100vh - ' + (BAR_H + 72) + 'px));flex:none;',
    'display:flex;flex-direction:column;overflow:hidden;background:var(--app-bg);',
    'border:26px solid #111;border-width:26px 9px 9px;border-radius:44px 44px 40px 40px;',
    'box-shadow:var(--shadow-lg);position:relative}',
    /* the speaker slit lives in the top bezel, not over the app header */
    '.dmb-notch{position:absolute;top:-17px;left:50%;transform:translateX(-50%);width:74px;height:5px;',
    'border-radius:3px;background:#fff;opacity:.24;z-index:5}',
    '.dmb-frame *::-webkit-scrollbar{width:0;height:0}',
    '.dmb-frame > *{max-width:100%}',
    '.dmb-install{position:fixed;left:12px;right:12px;bottom:calc(74px + env(safe-area-inset-bottom));z-index:30;',
    'display:flex;gap:11px;align-items:center;padding:11px 12px;border-radius:16px;',
    'background:rgba(20,42,27,.97);border:1px solid rgba(77,181,106,.35);color:#fff;box-shadow:0 12px 30px rgba(0,0,0,.45);font-family:var(--font-ui)}',
    '.dmb-install b{display:block;font-size:13px}',
    '.dmb-install span{display:block;font-size:11.5px;color:rgba(255,255,255,.7);line-height:1.35;margin-top:2px}',
    '.dmb-install button{flex:none;width:30px;height:30px;border-radius:15px;border:0;background:rgba(255,255,255,.1);color:#fff;font-size:18px;line-height:1;cursor:pointer}'
  ].join('');
  document.head.appendChild(css);

  /* On a phone, opened in the browser rather than from the home screen: one dismissible hint on how to install it.
     Installed (standalone) the app has no browser bar at all, which is the intended mobile look. */
  function installHint() {
    var standalone = window.navigator.standalone === true || window.matchMedia('(display-mode: standalone)').matches;
    if (standalone || localStorage.getItem('gb-install-hint') === 'off') return;
    var ios = /iPhone|iPad|iPod/.test(navigator.userAgent);
    var how = ios ? 'Tap Share, then “Add to Home Screen”.' : 'Open the browser menu, then “Add to Home screen” or “Install app”.';
    var hint = document.createElement('div');
    hint.className = 'dmb-install';
    hint.innerHTML = '<div class="gb-logotile" style="width:34px;height:34px;flex:none"><i class="gb-logo"></i></div>' +
      '<div style="flex:1;min-width:0"><b>Use it like an app</b><span>' + how + ' It opens full screen, without the browser bar.</span></div>' +
      '<button type="button" aria-label="Dismiss">&times;</button>';
    hint.querySelector('button').addEventListener('click', function () {
      localStorage.setItem('gb-install-hint', 'off'); hint.remove();
    });
    document.body.appendChild(hint);
  }

  function build() {
    var body = document.body;
    if (onPhone) { if (isMobile) installHint(); return; }

    if (isMobile) {
      var aside = body.querySelector('.dmb-aside');
      var stage = document.createElement('div');
      stage.className = 'dmb-stage';
      var frame = document.createElement('div');
      frame.className = 'dmb-frame';
      var kids = Array.prototype.slice.call(body.childNodes);
      kids.forEach(function (k) {
        if (k === aside) return;
        if (k.nodeType === 1 && k.tagName === 'SCRIPT') return;
        frame.appendChild(k);
      });
      var notch = document.createElement('i');
      notch.className = 'dmb-notch';
      frame.appendChild(notch);
      stage.appendChild(frame);
      if (aside) stage.appendChild(aside);
      body.insertBefore(stage, body.firstChild);
      body.style.cssText += ';background:var(--surface-page);height:calc(100vh - ' + BAR_H + 'px);overflow:hidden';
    }

    var bar = document.createElement('div');
    bar.className = 'dmb';

    var cover = '<a href="../../index.html" title="Back to the cover (Esc)">&#8598; Cover</a>';
    var middle;
    if (idx >= 0) {
      var s = STOPS[idx];
      var prev = idx > 0
        ? '<a class="dmb-nav" href="' + href(STOPS[idx - 1][0]) + '" title="Previous (&larr;)">&larr;</a>'
        : '<button class="dmb-nav" disabled>&larr;</button>';
      var next = idx < STOPS.length - 1
        ? '<a class="dmb-nav" href="' + href(STOPS[idx + 1][0]) + '" title="Next (&rarr;)">&rarr;</a>'
        : '<button class="dmb-nav" disabled>&rarr;</button>';
      middle = prev +
        '<span class="dmb-plain"><span class="dmb-count">' +
        (s[1] === 0 ? 'Beat 0' : 'Beat ' + s[1] + ' of 20') + '</span>&nbsp;&nbsp;<b>' + s[2] + '</b></span>' +
        next;
    } else {
      middle = '<span class="dmb-plain"><span class="dmb-count">Reference screen</span>' +
        '&nbsp;&nbsp;<b>' + cardLabel() + '</b></span>';
    }

    var dark = root.getAttribute('data-theme') === 'dark';
    bar.innerHTML =
      '<span style="display:flex;align-items:center;gap:10px">' + cover +
      '<a href="../../presentation/Client%20Presentation.dc.html" title="Open the client presentation">Presentation</a></span>' +
      '<span style="display:flex;align-items:center;gap:8px;margin:0 auto">' + middle + '</span>' +
      '<span style="display:flex;align-items:center;gap:6px">' +
      '<button id="dmb-theme" title="Toggle the page theme (the app stays dark by design)">' + (dark ? 'Light' : 'Dark') + '</button>' +
      '</span>';
    body.appendChild(bar);

    bar.querySelector('#dmb-theme').addEventListener('click', function (e) {
      var nowDark = root.getAttribute('data-theme') !== 'dark';
      root.setAttribute('data-theme', nowDark ? 'dark' : 'light');
      localStorage.setItem('gb-demo-theme', nowDark ? 'dark' : 'light');
      e.currentTarget.textContent = nowDark ? 'Light' : 'Dark';
    });

    /* reserve space: full-height app layouts shrink, scrolling pages get padding */
    if (!isMobile) {
      var h = parseFloat(getComputedStyle(body).height);
      if (Math.abs(h - window.innerHeight) < 3) {
        body.style.height = 'calc(100vh - ' + BAR_H + 'px)';
        body.style.maxHeight = 'calc(100vh - ' + BAR_H + 'px)';
      } else {
        body.style.paddingBottom = (BAR_H + 16) + 'px';
      }
    }

    document.addEventListener('keydown', function (e) {
      var t = e.target.tagName;
      if (t === 'INPUT' || t === 'TEXTAREA' || t === 'SELECT') return;
      if (e.key === 'Escape') location.href = '../../index.html';
      if (idx < 0) return;
      if (e.key === 'ArrowRight' && idx < STOPS.length - 1) location.href = href(STOPS[idx + 1][0]);
      if (e.key === 'ArrowLeft' && idx > 0) location.href = href(STOPS[idx - 1][0]);
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', build);
  else build();
})();
