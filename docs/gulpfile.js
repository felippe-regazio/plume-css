const gulp = require('gulp');
const uglify_js = require('gulp-uglify');
const babel = require('gulp-babel');
const plumber = require('gulp-plumber');
const concat = require('gulp-concat');
const htmlImport = require('gulp-html-import');
const rename = require("gulp-rename");
const sass = require('gulp-sass');
const clean_css = require('gulp-clean-css');
const sassVars = require('gulp-sass-variables');
const prefix = require('gulp-autoprefixer');
const mustache = require('gulp-mustache');
const plumeConfig = require('../plume.config.js');

gulp.task('build-js', function(){
	return gulp.src('./script/src/**/*.js')
	.pipe(plumber(true))
	.pipe(babel({presets: ['@babel/preset-env']}))
	.pipe(concat('main.min.js'))
	.pipe(uglify_js())
	.pipe(gulp.dest('./script/'));
});

gulp.task('build-css', function(){
	return gulp.src(`./style/src/**/*.scss`)
	.pipe(plumber(true))
	.pipe(sassVars({
		$superclass: `.${plumeConfig.superclass}` || '', 
		$prefix: plumeConfig.prefixer ? plumeConfig.prefixer.prefix || '' : ''
	}))
	.pipe(sass({outputStyle: 'compressed'}))
	.pipe(clean_css())
	.pipe(prefix())
	.pipe(concat('main.min.css'))
	.pipe(gulp.dest('./style/'));
});

gulp.task('build-html', function () {
	return gulp.src('./template.html')
		.pipe(htmlImport('./html/'))
		.pipe(rename("index.html"))
		.pipe(mustache({
			superclass: plumeConfig.superclass || '',
			prefix: plumeConfig.prefixer ? plumeConfig.prefixer.prefix || '' : ''
		}))
		.pipe(gulp.dest('./')); 
});

gulp.task('get-plume-css', function() {
  return gulp.src(`../${plumeConfig.targetDirName}/plume-all.css`)
    .pipe(gulp.dest('./style'));
});

gulp.task('watch', function(done) {
	if (process.argv.includes('--watch')) {
		console.log(`Watching docs directory, press Ctrl+C to exit`);
		gulp.watch(['./style/src/**/*.scss', './script/src/**/*.js', './html/**/*.html'], gulp.series('build-js', 'build-css', 'build-html', 'get-plume-css'));
	} else {
		done();
	}
});

gulp.task('default', gulp.series('build-js', 'build-css', 'build-html', 'get-plume-css', 'watch'));