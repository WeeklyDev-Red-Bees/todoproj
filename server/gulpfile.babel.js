import fs from 'fs';
import gulp from 'gulp';
import gLP from 'gulp-load-plugins';
import bS from 'browser-sync';
import del from 'del';
import runSeq from 'run-sequence';

const BROWSER_SYNC_RELOAD_DELAY = 500;
const FAVICON_DATA_FILE = 'faviconData.json';

var plugins = gLP({
  rename: {
    'gulp-real-favicon': 'realFavicon'
  }
});
var browserSync = bS.create();

// var paths = { src: {}, dist: {} };
var paths = {
  serverJS: {
    'src': 'src/app/**/*.js',
    'dist': 'dist/app'
  }
};

var _paths = {
  fonts: ['fonts/*', 'fonts/'],
  images: ['img/**/*', 'img/'],
  js: ['js/*.js', 'js/'],
  style: ['scss/**/*.scss', 'css/'],
  templates: ['templates/**', '']
};

for (var pathName in _paths) {
  var _path = _paths[pathName];
  // paths.src[pathName] = 'src/server/assets/'+_path[0];
  // paths.dist[pathName] = 'dist/server/assets/'+_path[1];
  paths[pathName] = {
    'src': `src/assets/${_path[0]}`,
    'dist': `dist/assets/${_path[1]}`
  };
}

const browserStream = (s) => s.pipe(browserSync.stream());

gulp.task('clean', () => del('dist'));

gulp.task('build:fonts', () => {
  return browserStream(gulp.src(paths.fonts.src)
    .pipe(gulp.dest(paths.fonts.dist)));
});

gulp.task('build:img', () => {
  return browserStream(gulp.src(paths.images.src)
    .pipe(plugins.imagemin())
    .pipe(gulp.dest(paths.images.dist)));
});

gulp.task('build:templates', () => {
  return browserStream(gulp.src(paths.templates.src)
    .pipe(gulp.dest(paths.templates.dist)));
});

gulp.task('build:css', () => {
  return browserStream(gulp.src(paths.style.src)
    .pipe(plugins.sass({
      outputStyle: 'compressed'
    }))
    .pipe(plugins.plumber())
    .pipe(plugins.autoprefixer({
      browsers: ['last 2 versions', 'last 3 iOS versions'],
      cascade: false,
      flexbox: true
    }))
    .pipe(gulp.dest(paths.style.dist)));
});

gulp.task('lint:js', () => {
  return gulp.src(paths.js.src)
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter('default'));
});

gulp.task('build:js', ['lint:js'], () => {
  return browserStream(gulp.src(paths.js.src)
    .pipe(plugins.concat('scripts.js'))
    .pipe(gulp.dest(paths.js.dist)));
});

gulp.task('lint:serverJS', () => {
  return gulp.src([paths.serverJS.src, '!node_modules/**'])
    .pipe(plugins.eslint())
    .pipe(plugins.eslint.format())
    .pipe(plugins.eslint.failAfterError());
});

gulp.task('build:serverJS', ['lint:serverJS'], () => {
  return browserStream(gulp.src(paths.serverJS.src)
    .pipe(plugins.babel())
    .pipe(gulp.dest(paths.serverJS.dist)));
})

gulp.task('build:favicon', (cb) => {
  plugins.realFavicon.generateFavicon({
    masterPicture: 'src/assets/img/favicon',
    dest: paths.images.src+'favicons',
    iconsPath: 'src/assets/img/favicons',
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
  }, () => cb());
});

// gulp.task('inject:favicon', () => {
//   // TODO: Populate faviconTargets
//   let faviconTargets = [];
//   // TODO: Set faviconDest
//   let faviconDest = '';
  
//   let faviconData = JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).favicon.html_code;
//   return gulp.src(faviconTargets)
//     .pipe(plugins.realFavicon.injectFaviconMarkups(faviconData))
//     .pipe(gulp.dest(faviconDest));
// });

gulp.task('update:favicon', (cb) => {
  let currentVersion = JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).version;
  plugins.realFavicon.checkForUpdates(currentVersion, (err) => {
    if (err) {
      return cb(err);
    } else {
      cb();
    }
  });
});

// gulp.task('build', [
//   'build:fonts',
//   'build:img',
//   'build:js',
//   'build:css',
//   'build:templates',
//   'build:serverJS'
// ]);

gulp.task('build', ['clean'], (cb) => {
  runSeq([
    'build:fonts',
    'build:img',
    'build:js',
    'build:css',
    'build:templates',
    'build:serverJS'
  ], cb);
});

gulp.task('watch', ['clean', 'build'], () => {
  gulp.watch(paths.fonts.src, ['build:fonts']);
  gulp.watch(paths.images.src, ['build:img']);
  gulp.watch(paths.js.src, ['build:js']);
  gulp.watch(paths.style.src, ['build:css']);
  gulp.watch(paths.templates.src, ['build:templates']);
});

gulp.task('nodemon', ['build'], (cb) => {
  var called = false;
  
  return plugins.nodemon({
    script: './bin/www',
    watch: ['src']
  }).on('start', () => {
    if (!called) {
      cb();
    }
    called = true;
  }).on('restart', () => {
    setTimeout(() => {
      browserSync.reload({
        stream: false
      });
    }, BROWSER_SYNC_RELOAD_DELAY);
  });
});

gulp.task('browser-sync', ['nodemon'], () => {
  browserSync.init({
    proxy: 'localhost:4000',
    port: 3000,
    open: false
  });
});

gulp.task('default', ['watch', 'browser-sync']);
