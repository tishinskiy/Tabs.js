;'use strict';

const gulp = require('gulp');
const del = require('del');
const browserSync  = require('browser-sync').create();
const plumber = require('gulp-plumber');
const csso = require('gulp-csso');
const uglify = require('gulp-uglify');
const htmlmin = require('gulp-htmlmin');

gulp.task('clean', function(){
	return del('./dist, ./demo')
})

gulp.task('views', function() {
	return gulp.src('src/index.html')
	.pipe(plumber())
	.pipe(htmlmin({collapseWhitespace: true}))
	.pipe(gulp.dest('./demo'));
});

gulp.task('styles', function() {
	return gulp.src('src/style.css')
	.pipe(plumber())
	.pipe(csso())
	.pipe(gulp.dest('demo/'));
});

gulp.task('scripts', function() {
	return gulp.src('src/tabs.js')
	.pipe(plumber())
	.pipe(uglify())
	.pipe(gulp.dest('dist'))
});

gulp.task('watch', function() {
	gulp.watch('src/style.css', gulp.series('styles'));
	gulp.watch('src/index.html', gulp.series('views'));
	gulp.watch('src/tabs.js', gulp.series('scripts'));
});

gulp.task('serve', function() {
	browserSync.init({
		server: './'
	});

	browserSync.watch('demo').on('change', browserSync.reload);
	browserSync.watch('dist').on('change', browserSync.reload);
});

gulp.task('build', gulp.series('clean', gulp.parallel('views', 'styles', 'scripts')));

gulp.task('dev',
	gulp.series('build', gulp.parallel('watch', 'serve'))
);