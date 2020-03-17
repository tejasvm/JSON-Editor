[
    'scripts/utils.js',
    'scripts/domElemets.js',
    'scripts/filereader.js',
    'scripts/actions.js',
    'scripts/tableCreator.js',
    'scripts/eventListeners.js'
].forEach(function (src) {
    var script = document.createElement('script');
    script.src = src;
    script.async = true;
    document.head.appendChild(script);
});