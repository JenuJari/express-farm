const casper = require('casper').create({
    clientScripts:  [
        // These two scripts will be injected in remote
        // DOM on every request
        './../../node_modules/jquery/dist/jquery.min.js',
        './../../node_modules/moment/min/moment.min.js',
        './../../node_modules/lodash/lodash.js'
        ],
        pageSettings: {
        loadImages:  false,        // The WebPage instance used by Casper will
        loadPlugins: false         // use these settings
    },
    logLevel: "error",              // Only "info" level messages will be logged
    verbose: true                  // log messages will be printed out to the console
});
var utils = require('utils');
var FS = require('fs');

let test = {};

casper.start('http://casperjs.org/', function() {
    test.one = this.getTitle(); 
});

casper.thenOpen('http://phantomjs.org', function() {
    test.two = this.getTitle();
});

casper.run(function () {
    FS.write('output.json', JSON.stringify(test));
    this.exit();
});
