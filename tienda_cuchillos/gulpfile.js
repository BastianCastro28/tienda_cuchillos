const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const rename = require('gulp-rename');
const changed = require('gulp-changed');

// Paths
const paths = {
  styles: {
    src: 'css/**/*.scss',
    dest: 'distri/css/'
  },
  scripts: {
    src: 'js/**/*.js',
    dest: 'distri/js/'
  },
  images: {
    src: 'assets/images/**/*',
    dest: 'distri/images/'
  }
};

// SCSS Task
function scssTask() {
  return gulp.src(paths.styles.src)
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(paths.styles.dest));
}

// JS Task
function jsTask() {
  return gulp.src(paths.scripts.src)
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(paths.scripts.dest));
}

// Images Task
function imagesTask() {
  return gulp.src(paths.images.src)
    .pipe(changed(paths.images.dest))
    .pipe(imagemin())
    .pipe(gulp.dest(paths.images.dest));
}

// Watch Task
function watchTask() {
  gulp.watch(paths.styles.src, scssTask);
  gulp.watch(paths.scripts.src, jsTask);
  gulp.watch(paths.images.src, imagesTask);
}

exports.default = gulp.series(
  gulp.parallel(scssTask, jsTask, imagesTask),
  watchTask
);
