var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCSS = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    browserSync = require('browser-sync').create(),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify');

gulp.task('browser-sync', ['styles'], function () {
    browserSync.init({
        server: {
            baseDir: "./public"
        },
        notify: false
    });
});

gulp.task('styles', function () {
    return gulp.src('src/*.sass')
        .pipe(sass({
            includePaths: require('node-bourbon').includePaths
        }).on('error', sass.logError))
        .pipe(rename({suffix: '.min', prefix: ''}))
        .pipe(autoprefixer({browsers: ['last 15 versions'], cascade: false}))
        .pipe(cleanCSS())
        .pipe(gulp.dest('public/css'))
        .pipe(browserSync.stream());
});

gulp.task('watch', function () {
    gulp.watch('src/*.sass', ['styles']);
    gulp.watch('public/*.html').on('change', browserSync.reload);
});

gulp.task('default', ['browser-sync', 'watch']);
