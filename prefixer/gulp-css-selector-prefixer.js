const through = require('through2');
const CSSPrefixer = require('./css-selector-prefixer.js');

module.exports = function(options) {

  options = options || {};
  
  return through.obj(function(file, enc, cb) {
    if (file.isNull()) {
      cb(null, file);
      return;
    }

    if (!file.isBuffer()) {
      cb();
    }
    
    var src = file.contents.toString();
    var css = CSSPrefixer.prefix(src, options);

    file.contents = new Buffer.from(css);
    cb(null, file);
  });
};