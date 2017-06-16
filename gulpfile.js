var gulp = require('gulp'),
    babel = require('gulp-babel'),
    autoprefixer = require('gulp-autoprefixer'),
    rename = require("gulp-rename"),
    cleanCSS = require('gulp-clean-css'),
    del = require('del'),
    uglify = require('gulp-uglify'),
    pump = require('pump'),
    concat = require('gulp-concat')

gulp.task('css', ['clean'], function() {
    // .pipe(autoprefixer())
    return gulp.src('./css/*.css')
        .pipe(concat('transition.css'))
        .pipe(cleanCSS())
        .pipe(rename({ suffix: '-min' }))
        .pipe(gulp.dest('./css'))
})
gulp.task('js', function(fn) {
    return gulp.src('./src/*.js')
        .pipe(babel({ presets: ['es2015'] }))
        .pipe(uglify())
        .pipe(gulp.dest('./'))
})
gulp.task('clean', function(fn) {
    return del(['./css/*-min.css'], fn)
})

gulp.task('default', ['css', 'js'])

gulp.task('watch', function() {
    gulp.watch(['./src/*.js'], ['js'])
    gulp.watch(['./css/*.css'], ['css'])
})
