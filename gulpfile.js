const gulp = require('gulp');
const sass = require('gulp-sass');
const clean_css = require('gulp-clean-css');
const autoprefix = require('gulp-autoprefixer');
const plumber = require('gulp-plumber');
const rimraf = require("rimraf");
const path = require('path');
const size = require('gulp-size');
const sassVars = require('gulp-sass-variables');

const cssPrefix = require('./prefixer/gulp-css-selector-prefixer.js');
const plumeConfig = require('./plume.config.js');

const SOURCE_PATH = './sass';
const DIST_PATH = plumeConfig.targetDirName;

gulp.task('build', function() {

	rimraf(path.join(__dirname, `${DIST_PATH}`), () => {});
	
	let stream = gulp.src(`${SOURCE_PATH}/**/*.scss`)
		.pipe(plumber(true))
		.pipe(sassVars({$superclass: plumeConfig.superclass || 'plume'}))
		.pipe(sass({outputStyle: plumeConfig.outputStyle || 'compressed'}))
		.pipe(clean_css())
		.pipe(autoprefix())
		.pipe(size())

	if (plumeConfig.prefixer) {
		stream = stream.pipe(cssPrefix(plumeConfig.prefixer))
	}

	return stream.pipe(gulp.dest(DIST_PATH));
});

gulp.task('watch', function(done) {
	if (process.argv.includes('--watch')) {
		console.log("Watching source directory, press Ctrl+C to exit");
		gulp.watch(`${SOURCE_PATH}/**/*.scss`, gulp.series('build'));
	} else {
		done();
	}
});

gulp.task('default', gulp.series('build', 'watch'));