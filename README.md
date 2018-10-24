# browser-md5-file [![Build Status](https://travis-ci.org/forsigner/browser-md5-file.svg?branch=master)](https://travis-ci.org/forsigner/browser-md5-file) [![NPM Version](http://img.shields.io/npm/v/browser-md5-file.svg?style=flat)](https://www.npmjs.org/package/browser-md5-file)

MD5 file in browser. Base on [js-spark-md5](https://github.com/satazor/js-spark-md5).

### Demo

[demo](http://forsigner.com/browser-md5-file)

### Installation

#### npm

```bash
$ npm install browser-md5-file --save
```

### Usage

```js
var browserMD5File = require('browser-md5-file');
var el = document.getElementById('upload');

el.addEventListener('change', handle, false);

function handle(e) {
  var file = e.target.files[0];
  browserMD5File(file, function(err, md5) {
    console.log(md5); // 97027eb624f85892c69c4bcec8ab0f11
  });
}
```

### Browser compatibility

- IE9+
- Firefox
- Chrome
- Safari
- Opera

### License

[MIT](LICENSE)
