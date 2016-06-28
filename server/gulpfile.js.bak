// include gulp
var gulp = require('gulp');

// include plugins
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

// folders
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
	srcStyle = src + 'scss/**/*.scss',
	srcTemplates = src + 'templates/**/*';

// default task
gulp.task('default', ['watch', 'browser-sync']);

// watch files
gulp.task('watch', ['deleteDist', 'fonts', 'img', 'js', 'css', 'templates'], function() {
	gulp.watch(srcFonts, ['fonts']);
	gulp.watch(srcImages, ['img']);
	gulp.watch(srcJs, ['js']);
	gulp.watch(srcStyle, ['css']);
	gulp.watch(srcTemplates, ['templates']);
	gulp.watch('views/**/*.ejs').on('change', browserSync.reload);
});

// browser-sync server
gulp.task('browser-sync', ['nodemon'], function() {

	browserSync.init({
		// proxy to nodemon server
		proxy: 'localhost:4000',
		// port to access in browser
		port: 3000,
		// don't automatically open in browser
		open: false
	});

});

var BROWSER_SYNC_RELOAD_DELAY = 500;
// nodemon server
gulp.task('nodemon', function(cb) {

	var called = false;

	return nodemon({
			script: 'bin/www',
			watch: ['/bin/', '/routes/', '/views/', 'app.js']
		})
		.on('start', function onStart() {
			if (!called) {
				cb();
			}
			called = true;
		})
		.on('restart', function onRestart() {
			// reload connected browsers after a slight delay
			setTimeout(function reload() {
				browserSync.reload({
					stream: false
				});
			}, BROWSER_SYNC_RELOAD_DELAY);
		});

});

// delete dist
gulp.task('deleteDist', function() {
	return del.sync(dist);
})

// copy fonts
gulp.task('fonts', function() {
	return gulp.src(srcFonts)
		.pipe(gulp.dest(distFonts))
		.pipe(browserSync.stream());
});

// copy images
gulp.task('img', function() {
	return gulp.src(srcImages)
		.pipe(imagemin())
		.pipe(gulp.dest(distImages))
		.pipe(browserSync.stream());
});
// copy templates
gulp.task('templates', function() {
	return gulp.src(srcTemplates)
		.pipe(gulp.dest(distTemplates))
		.pipe(browserSync.stream());
});

// js lint task
gulp.task('lint', function() {
	return gulp.src(srcJs)
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

// compile sass
gulp.task('css', function() {
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
		.pipe(gulp.dest(distStyle))
		.pipe(browserSync.stream());
});

// concatenate & minify js
gulp.task('js', function() {
	return gulp.src(srcJs)
		.pipe(concat('scripts.js'))
		.pipe(gulp.dest(distJs))
		.pipe(browserSync.stream());
});

var realFavicon = require ('gulp-real-favicon');
var fs = require('fs');

// File where the favicon markups are stored
var FAVICON_DATA_FILE = 'faviconData.json';

// Generate the icons. This task takes a few seconds to complete.
// You should run it at least once to create the icons. Then,
// you should run it whenever RealFaviconGenerator updates its
// package (see the check-for-favicon-update task below).
gulp.task('generate-favicon', function(done) {
	realFavicon.generateFavicon({
		masterPicture: 'assets/img/favicon.png',
		dest: 'src/img/favicons',
		iconsPath: 'img/favicons',
		design: {
			ios: {
				pictureAspect: 'noChange'
			},
			desktopBrowser: {},
			windows: {
				pictureAspect: 'noChange',
				backgroundColor: '#da532c',
				onConflict: 'override'
			},
			androidChrome: {
				pictureAspect: 'noChange',
				themeColor: '#ffffff',
				manifest: {
					name: 'todo',
					display: 'browser',
					orientation: 'notSet',
					onConflict: 'override',
					declared: true
				}
			},
			safariPinnedTab: {
				pictureAspect: 'silhouette',
				themeColor: '#5bbad5'
			}
		},
		settings: {
			scalingAlgorithm: 'Mitchell',
			errorOnImageTooSmall: false
		},
		markupFile: FAVICON_DATA_FILE
	}, function() {
		done();
	});
});

// Inject the favicon markups in your HTML pages. You should run
// this task whenever you modify a page. You can keep this task
// as is or refactor your existing HTML pipeline.
gulp.task('inject-favicon-markups', function() {
	gulp.src([ 'TODO: List of the HTML files where to inject favicon markups' ])
		.pipe(realFavicon.injectFaviconMarkups(JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).favicon.html_code))
		.pipe(gulp.dest('TODO: Path to the directory where to store the HTML files'));
});

// Check for updates on RealFaviconGenerator (think: Apple has just
// released a new Touch icon along with the latest version of iOS).
// Run this task from time to time. Ideally, make it part of your
// continuous integration system.
gulp.task('check-for-favicon-update', function(done) {
	var currentVersion = JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).version;
	realFavicon.checkForUpdates(currentVersion, function(err) {
		if (err) {
			throw err;
		}
	});
});
