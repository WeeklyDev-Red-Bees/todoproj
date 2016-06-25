import gulp from 'gulp';
import gutil, { PluginError } from 'gulp-util';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import sourcemaps from 'gulp-sourcemaps';

import assign from 'object-assign';
import browserify from 'browserify';
import watchify from 'watchify';
import babelify from 'babelify';
import scssify from 'scssify';
import stringify from 'stringify';

import runSeq from 'run-sequence';

import del from 'del';

gulp.task('clean', () => del('dist'));

gulp.task('copy', ['clean'], () => {
  return gulp.src(['src/index.html'])
    .pipe(gulp.dest('dist'));
});

gulp.task('build:polyfills', () => {
  const b = newBundle('polyfills', { debug: true });
  return bundle(b, 'polyfills');
});

gulp.task('build:vendor', () => {
  const b = newBundle('vendor', { debug: true });
  return bundle(b, 'vendor');
});

gulp.task('build:main', () => {
  const b = newBundle('main', { debug: true });
  return bundle(b, 'main');
});

gulp.task('build', ['copy'], (cb) => {
  // runSeq('build:polyfills', 'build:vendor', 'build:main', cb);
  runSeq('build:main', cb);
});

function newBundle(n, opts) {
  return browserify(`src/${n}.js`, opts)
    .transform(babelify)
    .transform(stringify, {
      appliesTo: { includeExtensions: ['.html'] }
    })
    .transform(scssify, {
      autoInject: false,
      export: true
    });
}

function bundle(b, n) {
  return b.bundle()
    .on('error', (e) => {
      console.error(e);
    })
    // .pipe(source('bundle.js'))
    .pipe(source(`${n}.js`))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('dist'));
}