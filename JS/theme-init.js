(function () {
  var stored = null;
  try {
    stored = localStorage.getItem('nd-theme');
  } catch (e) {}

  var theme;
  if (stored === 'dark' || stored === 'light') {
    theme = stored;
  } else {
    var dark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    theme = dark ? 'dark' : 'light';
  }
  document.documentElement.setAttribute('data-theme', theme);
})();
