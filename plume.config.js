module.exports = {
  superclass: 'plume',
  output: 'plume.min.css',
  outputStyle: 'compressed',
  prefixer: {
    prefix: 'pm-',
    ignore: ['.plume'],
  }
}