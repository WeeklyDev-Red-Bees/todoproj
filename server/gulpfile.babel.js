// Import the required modules.
import fs from 'fs';
import gulp from 'gulp';
import gLP from 'gulp-load-plugins';
import del from 'del';
import runSeq from 'run-sequence';

var plugins = gLP();

// SRC path to dist path
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
});

gulp.task('conf:check', (cb) => {
	var conf = require('./config/default.json');
	var changed = false;
	if (!conf.jwt) {
		changed = true;
		let str = require('randomstring').generate({
			charset: "!#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[]^_`abcdefghijklmnopqrstuvwxyz",
			length: Math.floor(Math.random()*(30-20+1)+20)
		});
		conf.jwt = str;
		// fs.writeFileSync('./config/default.json', JSON.stringify(conf, null, 2));
		// console.log('JWT Secret has been set to:', str);
	}
	
	if (!conf.db) {
		changed = true;
		conf.db = {
			host: '127.0.0.1',
			name: 'todoproj',
			port: 27017
		};
	} else if (!conf.db.host) {
		changed = true;
		conf.db.host = '127.0.0.1';
	} else if (!conf.db.name) {
		changed = true;
		conf.db.name = 'todoproj';
	} else if (!conf.db.port) {
		changed = true;
		conf.db.port = 27017;
	}
	
	if (!conf.http) {
		changed = true;
		conf.http = {
			port: 3000
		};
	} else if (!conf.http.port) {
		changed = true;
		conf.http.port = 3000;
	}
	if (changed) {
		console.log('Your configuration is missing some values.');
		console.log('Your configuration will be changed to reflect the following:');
		console.log(JSON.stringify(conf, null, 2));
		fs.writeFileSync('./config/default.json', JSON.stringify(conf, null, 2));
	}
	cb();
});

gulp.task('build', ['clean'], (cb) => {
	runSeq([
		'conf:check',
		'build:serverJS'
	], cb);
});
