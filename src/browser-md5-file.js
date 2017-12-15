'use strict';

var SparkMD5 = require('spark-md5');

module.exports.prototype = function (file, callback) {
	var self = module.exports.prototype;
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

        if(progressCallback !== null && typeof progressCallback === "function")
        {
            self.progress = currentChunk / chunks;
        }

		if(!module.exports.aborted)
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

    reader.onerror = function () {
        callback('oops, something went wrong.');
    };

    /////////////////////////
    function loadNext() {
        var start = currentChunk * chunkSize;
        var end = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize;

        reader.readAsArrayBuffer(blobSlice.call(file, start, end));
    }
};

module.exports.prototype.abort = function() {
	var self = this;
	self.aborted = true;
};

