
// loading all the scripts from the scripts folder.
[
    // Paths of all the scripts.
    'scripts/utils.js',
    'scripts/domElemets.js',
    'scripts/fileReaders.js',
    'scripts/actions.js',
    'scripts/tableCreator.js',
    'scripts/eventListeners.js'
].forEach(function (src) {
    // Creating a script tag 
    let script = document.createElement('script');
    script.src = src;
    script.async = false;
    // Appending each of the scripts to the head of the HTML file
    document.head.appendChild(script);
});