const gulp = require('gulp');
const sass = require('gulp-sass');
const clean_css = require('gulp-clean-css');
const prefix = require('gulp-autoprefixer');
const plumber = require('gulp-plumber');
const concat = require('gulp-concat');
const rimraf = require("rimraf");
const path = require('path');
const size = require('gulp-size');

const SOURCE_PATH = './src';
const DIST_PATH = './dist';

gulp.task('build', function(){

	rimraf(path.join(__dirname, `${DIST_PATH}`), () => {});
	
	return gulp.src(`${SOURCE_PATH}/**/*.scss`)
	.pipe(plumber(true))
	.pipe(sass({outputStyle: 'compressed'}))
	.pipe(clean_css())
	.pipe(prefix())
	.pipe(size())
	.pipe(concat('plume.min.css'))
	.pipe(gulp.dest(DIST_PATH));
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