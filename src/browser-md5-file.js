'use strict';

(function() {
    var SparkMD5 = require('spark-md5');
    var BrowserMD5File = (function() {
        var BrowserMD5File = function (file, callback) {
            var self = this;
            self.aborted = false;
            self.progress = 0;
            var blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice;
            var chunkSize = 2097152;
            var chunks = Math.ceil(file.size / chunkSize);
            var currentChunk = 0;
            var spark = new SparkMD5.ArrayBuffer();
            var reader = new FileReader();

            loadNext();
			
            reader.onloadend = function (e) {
                spark.append(e.target.result); // Append array buffer
                currentChunk++;
                self.progress = currentChunk / chunks;

                if(!self.aborted)
                {
                    if (currentChunk < chunks) {
                        loadNext();
                    } else {
                        callback(null, spark.end());
                    }
                }
                else
                {
                    callback(null, "skipped");
                }
            };

            /////////////////////////
            function loadNext() {
                var start = currentChunk * chunkSize;
                var end = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize;
                reader.readAsArrayBuffer(blobSlice.call(file, start, end));
            }
        };

        BrowserMD5File.prototype.abort = function() {
            var self = this;
            self.aborted = true;
        };

        BrowserMD5File.prototype.getProgress = function(inPercent)
        {
            var self = this;
            var progress = self.progress;
            if(inPercent)
            {
                return Math.round(progress * 100);
            }
            else
            {
                return progress;
            }
        };

        return BrowserMD5File;
    })();

    if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
        module.exports = BrowserMD5File;
    }
    else {
        if (typeof define === 'function' && define.amd) {
            define([], function() {
                return BrowserMD5File;
            });
        }
        else {
            window.BrowserMD5File = BrowserMD5File;
        }
    }
})();
