'use strict';

var BrowserMD5File = require('./browser-md5-file');

if (typeof define === 'function' && define.amd) {
    define([], function() {
        return BrowserMD5File;
    });
}
else {
    window.BrowserMD5File = BrowserMD5File;
}


