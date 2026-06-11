(function () {
  var THEME_KEY = 'nd-theme';
  var FA_HREF = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css';

  function ensureFontAwesome() {
    if (document.querySelector('link[href*="font-awesome"]')) return;
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = FA_HREF;
    link.crossOrigin = 'anonymous';
    link.referrerPolicy = 'no-referrer';
    document.head.appendChild(link);
  }

  function chromeHtml() {
    var needsSpacer = !document.querySelector('.cs-topbar, .st-topbar, .legal-topbar');
    return [
      '<header class="site-header-bar" id="siteHeaderBar">',
      '  <a href="#menu" class="header-logo" id="megaMenuToggle" aria-label="Open menu" aria-haspopup="true" aria-controls="megaMenu">',
      '    <img src="IMG/nd-logo-v2c.png" alt="Nuanced Design Logo">',
      '  </a>',
      '  <button type="button" id="modeSwitch"><i class="fa-solid fa-moon" aria-hidden="true"></i> Dark Mode</button>',
      '</header>',
      needsSpacer ? '<div class="site-header-spacer" aria-hidden="true"></div>' : '',
      '<div class="mega-menu" id="megaMenu" aria-hidden="true" role="dialog" aria-label="Site menu">',
      '  <button type="button" class="mega-close" id="megaMenuClose" aria-label="Close menu"><i class="fa-solid fa-xmark" aria-hidden="true"></i></button>',
      '  <nav class="mega-nav" aria-label="Main menu">',
      '    <div class="menu-line-mask"><a class="menu-line" href="./"><span class="menu-num">01</span><span class="menu-text">Home</span></a></div>',
      '    <div class="menu-line-mask"><a class="menu-line" href="./#featuredWork"><span class="menu-num">02</span><span class="menu-text">Featured Work</span></a></div>',
      '    <div class="menu-line-mask"><a class="menu-line" href="./#archive"><span class="menu-num">03</span><span class="menu-text">Archive</span></a></div>',
      '    <div class="menu-line-mask"><a class="menu-line" href="./#process"><span class="menu-num">04</span><span class="menu-text">Process</span></a></div>',
      '    <div class="menu-line-mask"><a class="menu-line" href="./#about"><span class="menu-num">05</span><span class="menu-text">About</span></a></div>',
      '    <div class="menu-line-mask"><a class="menu-line" href="versions.html"><span class="menu-num">06</span><span class="menu-text">The Story</span></a></div>',
      '    <div class="menu-line-mask"><a class="menu-line" href="./#pricing"><span class="menu-num">07</span><span class="menu-text">Pricing</span></a></div>',
      '    <div class="menu-line-mask"><a class="menu-line menu-cta" href="./"><span class="menu-num">08</span><span class="menu-text">Book a Call <span class="menu-balloon" aria-hidden="true">🎈</span></span></a></div>',
      '  </nav>',
      '  <div class="mega-footer">',
      '    <a href="mailto:hello@nuanceddesign.com">hello@nuanceddesign.com</a>',
      '    <a href="tel:6074445455">(607) 444-5455</a>',
      '  </div>',
      '</div>'
    ].join('\n');
  }

  function setMode(mode) {
    document.documentElement.setAttribute('data-theme', mode);
    try {
      localStorage.setItem(THEME_KEY, mode);
    } catch (e) {}

    var modeSwitch = document.getElementById('modeSwitch');
    if (!modeSwitch) return;

    if (mode === 'dark') {
      modeSwitch.innerHTML = '<i class="fa-solid fa-moon" aria-hidden="true"></i> Dark Mode';
      modeSwitch.style.background = '#23272b';
      modeSwitch.style.color = '#fff';
    } else {
      modeSwitch.innerHTML = '<i class="fa-solid fa-sun" aria-hidden="true"></i> Light Mode';
      modeSwitch.style.background = '#eee';
      modeSwitch.style.color = '#222';
    }
  }

  function initModeSwitch() {
    var modeSwitch = document.getElementById('modeSwitch');
    if (!modeSwitch || modeSwitch.dataset.bound === 'true') return;
    modeSwitch.dataset.bound = 'true';

    var current = document.documentElement.getAttribute('data-theme') || 'light';
    setMode(current === 'dark' ? 'dark' : 'light');

    modeSwitch.addEventListener('click', function () {
      var theme = document.documentElement.getAttribute('data-theme');
      setMode(theme === 'dark' ? 'light' : 'dark');
    });
  }

  function initMegaMenu() {
    var megaMenu = document.getElementById('megaMenu');
    var toggle = document.getElementById('megaMenuToggle');
    var closeBtn = document.getElementById('megaMenuClose');
    if (!megaMenu || megaMenu.dataset.bound === 'true') return;
    megaMenu.dataset.bound = 'true';

    function openMegaMenu() {
      megaMenu.classList.add('open');
      megaMenu.setAttribute('aria-hidden', 'false');
      document.body.classList.add('menu-open');
    }

    function closeMegaMenu() {
      megaMenu.classList.remove('open');
      megaMenu.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('menu-open');
    }

    function toggleMegaMenu(e) {
      if (e) e.preventDefault();
      megaMenu.classList.contains('open') ? closeMegaMenu() : openMegaMenu();
    }

    if (toggle) {
      toggle.addEventListener('click', toggleMegaMenu);
    }
    if (closeBtn) {
      closeBtn.addEventListener('click', closeMegaMenu);
    }

    megaMenu.querySelectorAll('.menu-line').forEach(function (link) {
      link.addEventListener('click', closeMegaMenu);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && megaMenu.classList.contains('open')) closeMegaMenu();
    });

    window.closeMegaMenu = closeMegaMenu;
    window.toggleMegaMenu = toggleMegaMenu;
  }

  function initScrollChrome() {
    var header = document.getElementById('siteHeaderBar');
    if (!header || header.dataset.scrollBound === 'true') return;
    header.dataset.scrollBound = 'true';

    var lastScroll = window.pageYOffset || 0;

    function updateScrollChrome(currentScroll) {
      var megaMenuEl = document.getElementById('megaMenu');
      var documentHeight = document.documentElement.scrollHeight;
      var windowHeight = window.innerHeight;
      var maxScroll = documentHeight - windowHeight;

      function showChrome() {
        header.classList.remove('hidden');
      }
      function hideChrome() {
        header.classList.add('hidden');
      }

      if (megaMenuEl && megaMenuEl.classList.contains('open')) {
        showChrome();
        return;
      }

      if (currentScroll >= maxScroll - 10) {
        hideChrome();
        return;
      }

      if (currentScroll <= 0) {
        showChrome();
        lastScroll = currentScroll;
        return;
      }

      if (currentScroll > lastScroll) {
        hideChrome();
      } else {
        showChrome();
      }
      lastScroll = currentScroll;
    }

    window.addEventListener('scroll', function () {
      updateScrollChrome(window.pageYOffset);
    }, { passive: true });
  }

  ensureFontAwesome();

  if (!document.getElementById('siteHeaderBar')) {
    document.body.classList.add('has-site-chrome');
    document.body.insertAdjacentHTML('afterbegin', chromeHtml());
  }

  initMegaMenu();
  initScrollChrome();
  initModeSwitch();

  window.ndSetTheme = setMode;
})();
