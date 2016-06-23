// Include gulp
var gulp = require('gulp');

// Include plugins
var autoprefixer = require('gulp-autoprefixer'),
	browserSync = require('browser-sync').create(),
	concat = require('gulp-concat'),
	del = require('del'),
	imagemin = require('gulp-imagemin'),
	jshint = require('gulp-jshint'),
	nodemon = require('gulp-nodemon'),
	plumber = require('gulp-plumber'),
	rename = require('gulp-rename'),
	sass = require('gulp-sass'),
	uglify = require('gulp-uglify');

// Folders
var dist = 'public/',
	distFonts = dist + 'fonts/',
	distImages = dist + 'img/',
	distJs = dist + 'js/',
	distStyle = dist + 'css/',
	distTemplates = dist,
	src = 'src/',
	srcFonts = src + 'fonts/*',
	srcImages = src + 'img/**/*',
	srcJs = src + 'js/*.js',
	srcJsVendor = src + 'js/vendor/*.js',
	srcStyle = src + 'scss/**/*.scss',
	srcTemplates = src + 'templates/**/*';


// Browser-sync server
gulp.task('serve', ['deleteDist', 'fonts', 'images', 'js', 'nodemon', 'sass', 'templates', 'vendor'], function() {

	browserSync.init({
		proxy: 'http://localhost:3000',
		port: 4000,
		open: false
	});

	gulp.watch(srcFonts, ['fonts']);
	gulp.watch(srcImages, ['images']);
	gulp.watch(srcJs, ['js']);
	gulp.watch(srcJsVendor, ['vendor']);
	gulp.watch(srcStyle, ['sass']);
	gulp.watch(srcTemplates, ['templates']);

});

// nodemon
gulp.task('nodemon', function(cb) {

	var started = false;

	return nodemon({
		script: 'bin/www'
	}).on('start', function() {
		if (!started) {
			cb();
			started = true;
		}
	});
});

// Delete dist
gulp.task('deleteDist', function() {
	return del.sync(dist);
})

// Copy fonts
gulp.task('fonts', function() {
	return gulp.src(srcFonts)
		.pipe(gulp.dest(distFonts));
});

// Copy images
gulp.task('images', function() {
	return gulp.src(srcImages)
		.pipe(imagemin())
		.pipe(gulp.dest(distImages));
});
// Copy templates
gulp.task('templates', function() {
	return gulp.src(srcTemplates)
		.pipe(gulp.dest(distTemplates));
});

// Lint Task
gulp.task('lint', function() {
	return gulp.src(srcJs)
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

// Compile sass
gulp.task('sass', function() {
	return gulp.src(srcStyle)
		.pipe(sass({
			outputStyle: 'compressed'
		}))
		.pipe(plumber())
		.pipe(autoprefixer({
			browsers: ['last 2 versions', 'last 3 iOS versions'],
			cascade: false,
			flexbox: true,
		}))
		.pipe(gulp.dest(distStyle));
});

// Concatenate & Minify JS
gulp.task('js', function() {
	return gulp.src(srcJs)
		.pipe(concat('scripts.js'))
		// .pipe(uglify()
		//     .pipe(plumber())
		.pipe(gulp.dest(distJs));
});

// Concatenate & Minify vendor JS
gulp.task('vendor', function() {
	return gulp.src(srcJsVendor)
		.pipe(concat('vendor.js'))
		// .pipe(uglify()
		//     .pipe(plumber())
		.pipe(gulp.dest(distJs));
});

// Default Task
gulp.task('default', ['serve']);
