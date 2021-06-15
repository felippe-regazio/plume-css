const version = require('./package.json').version;

module.exports = {
  plumeVersion: version,
  superclass: 'plume',
  outputStyle: 'compressed',
  targetDirName: 'lib',
  prefixer: {
    prefix: 'pm-',
    ignore: ['.plume'],
  }
}