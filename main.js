[
    'scripts/utils.js',
    'scripts/domElemets.js',
    'scripts/fileReaders.js',
    'scripts/actions.js',
    'scripts/tableCreator.js',
    'scripts/eventListeners.js'
].forEach(function (src) {
    console.log(src)
    var script = document.createElement('script');
    script.src = src;
    script.async = false;
    document.head.appendChild(script);
});