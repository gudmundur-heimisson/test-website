var gulp = require('gulp');
var typescript = require('gulp-typescript');
var less = require('gulp-less');
var tsProject = typescript.createProject('tsconfig.json', {outDir: '../js', rootDir: 'project/static/scripts/ts'});

gulp.task('ts', function() {
  var result = tsProject.src()
    .pipe(typescript(tsProject));
  return result.pipe(gulp.dest('project/static/scripts/js'));
});

gulp.task('less', function() {
  return gulp.src('project/static/scripts/*.less')
    .pipe(less({}))
    .pipe(gulp.dest('../js'));
});

gulp.task('watch-less', function() {
  gulp.watch(['project/static/scripts/**/*.less'], ['less']);
});

gulp.task('watch-ts', function() {
  gulp.watch(['project/static/scripts/**/*.ts'], ['ts']);
});

gulp.task('watch', ['watch-ts', 'watch-less'], function() {});

