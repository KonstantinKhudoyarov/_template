"use strict";

var gulp = require('gulp');
var rename = require("gulp-rename");
var minifyCSS = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var livereload = require('gulp-livereload');
var connect = require('gulp-connect');
var sass = require('gulp-sass');
var wait = require('gulp-wait');

//server connect
gulp.task('connect', function() {
  connect.server({
    root: 'dist',
    livereload: true
  });
});

//css
gulp.task('scss', function() {
  gulp.src('app/scss/main.scss')
    .pipe(wait(300))
    .pipe(sass())
    .pipe(autoprefixer({
            browsers: ['last 10 versions'],
            cascade: false
        }))
    .pipe(minifyCSS())
    .pipe(rename('main.min.css'))
    .pipe(gulp.dest('dist/css'))
    .pipe(connect.reload());
});

//html
gulp.task('html', function() {
   gulp.src('dist/index.html')
    .pipe(connect.reload());
});

//watch
gulp.task('watch', function(){
    gulp.watch(['app/scss/main.scss', 'app/scss/_misc/*.scss', 'app/scss/sections/*.scss'],  ['scss'])
    gulp.watch(['dist/index.html', 'dist/pages/*.html'], ['html']);
});

//default
gulp.task('default', ['connect', 'scss', 'html', 'watch']);
