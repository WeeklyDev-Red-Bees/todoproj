import fs from 'fs';
import gulp from 'gulp';
import gLP from 'gulp-load-plugins';
import del from 'del';
import runSeq from 'run-sequence';

var plugins = gLP();

var paths = {
	serverJS: {
		'src': 'src/**/*.js',
		'dist': 'dist'
	}
};

gulp.task('clean', () => del('dist'));

gulp.task('lint:serverJS', () => {
	return gulp.src([paths.serverJS.src, '!node_modules/**'])
		.pipe(plugins.eslint())
		.pipe(plugins.eslint.format())
		.pipe(plugins.eslint.failAfterError());
});

gulp.task('build:serverJS', ['lint:serverJS'], () => {
	return gulp.src(paths.serverJS.src)
		.pipe(plugins.babel())
		.pipe(gulp.dest(paths.serverJS.dist));
})

gulp.task('build', ['clean'], (cb) => {
	runSeq([
		'build:serverJS'
	], cb);
});
