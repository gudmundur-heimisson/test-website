var gulp = require('gulp');
var typescript = require('gulp-typescript');
var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');
var tsProject = typescript.createProject('tsconfig.json', { outDir: '../js', rootDir: 'project/static/scripts/ts' });

gulp.task('ts', function () {
  var result = tsProject.src()
    .pipe(sourcemaps.init())
    .pipe(typescript(tsProject));
  return result.js
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('project/static/scripts/js'));
});

gulp.task('less', function () {
  return gulp.src('project/static/less/*.less')
    .pipe(less({}))
    .pipe(gulp.dest('project/static/css'));
});

gulp.task('watch-less', function () {
  gulp.watch(['project/static/less/*.less'], ['less']);
});

gulp.task('watch-ts', function () {
  gulp.watch(['project/static/scripts/ts/*.ts'], ['ts']);
});

gulp.task('watch', ['watch-ts', 'watch-less'], function () { });

