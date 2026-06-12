
function includeJS(incFile)
	{document.write('<script type="text/javascript" src="'+ incFile+ '"></script>');}

var jsBase = (function () {
	var script = document.currentScript;
	if (script) {
		var src = script.src || script.getAttribute('src') || '';
		if (src.indexOf('global.js') !== -1) {
			return src.replace(/global\.js(\?.*)?$/, '');
		}
	}
	var scripts = document.getElementsByTagName('script');
	for (var i = scripts.length - 1; i >= 0; i--) {
		var src = scripts[i].src || scripts[i].getAttribute('src') || '';
		if (src.indexOf('global.js') !== -1) {
			return src.replace(/global\.js(\?.*)?$/, '');
		}
	}
	return '/JS/';
})();

includeJS('https://code.jquery.com/jquery-latest.js');
// includeJS('JS/header-hide.js');
//includeJS('JS/selection-sharer.js');
//includeJS('JS/featherlight.js');
includeJS(jsBase + 'custom.js');
//includeJS('JS/lity.js');
includeJS(jsBase + 'dark-mode.js');


