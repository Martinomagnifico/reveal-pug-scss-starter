"use strict";

const { src, dest, watch, series, parallel } = require('gulp'),
		fs = require('fs'),
		sass = require('gulp-sass')(require('sass')),
		pug = require('gulp-pug'),
		plumber = require('gulp-plumber'),
		autoprefixer = require('gulp-autoprefixer'),
		browserSync = require('browser-sync').create(),
		merge = require('merge-stream');

const buildfolder = "./build"
const sourcefolder = "./src";
const dependencyfolder = `${buildfolder}/assets/libs`

const copydeps = function () {
	let deps = [];
	// Get the dependencies from package.json
	let packageDependencies = (JSON.parse(fs.readFileSync('./package.json'))).dependencies;

	// Put the names of the dependencies in an array
	for (const [key, value] of Object.entries(packageDependencies)) {
		deps.push(key)
	}
	let tasks = deps.map(function(dependency){
		return src([`node_modules/${dependency}/**`])
		.pipe(dest(`${dependencyfolder}/${dependency}`) )
	});
	return merge(tasks);
};

const styles = function () {
	return (
		src(`${sourcefolder}/assets/scss/*.scss`)
		.pipe(plumber())
		.pipe(sass())
		.pipe(autoprefixer())
		.pipe(dest(`${buildfolder}/assets/css`))
		.pipe(browserSync.stream())
	);
}

const scripts = function () {
	return (
		src(`${sourcefolder}/assets/js/**/*.js`)
		.pipe(plumber())
		.pipe(dest(`${buildfolder}/assets/js`))
		.pipe(browserSync.stream())
	);
}

const views = function () {
	return (
		src(`${sourcefolder}/**/[^_]*.pug`)
		.pipe(plumber())
		.pipe(pug({
			basedir: sourcefolder,
			pretty: true
		}))
		.pipe(dest(buildfolder))
		.pipe(browserSync.stream())
	)
}

const img = function () {
	return (
		src(`${sourcefolder}/assets/img/**/*.{gif,jpg,png,svg}`)
		.pipe(dest(`${buildfolder}/assets/img/` ))
	)
};

const fonts = function () {
	return (
		src(`${sourcefolder}/assets/fonts/**/*.{eot,svg,woff,ttf,woff2}`)
		.pipe(dest(`${buildfolder}/assets/fonts/` ))
	)
};

// Browsersync Tasks
const serve = function (callback) {
	browserSync.init({
		notify: false,
		server: {
			baseDir: buildfolder,
			directory: false
		}
	});
	callback();
}

const watchtask = function (done) {
	watch(`${sourcefolder}/**/*.pug`, views);
	watch(`${sourcefolder}/assets/scss/**/*.scss`, styles);
	watch(`${sourcefolder}/assets/js/**/*.js`, scripts);
	watch(`${sourcefolder}/assets/img/**/*.{gif,jpg,png,svg}`, img);
	done();
}

const buildTask = parallel(copydeps, fonts, img, styles, scripts, views);

exports.default = series(buildTask, serve, watchtask);
