var gulp = require('gulp')
var jade = require('gulp-jade');
var scss = require('gulp-sass');

// @NOTE compile jade files
gulp.task('jade', function () {
    return gulp.src('_jade/**/*.jade')
    .pipe(jade())

    // @FIXME special case for the index, since this app only has an index page
    .pipe(gulp.dest(''));
});

// @NOTE compile scss files
gulp.task('scss', function () {
    return gulp.src('_scss/**/*.scss')
    .pipe(scss())
    .pipe(gulp.dest('assets/css'));
});

gulp.task('watch', function() {
    gulp.watch('_jade/**/*.jade', ['jade']);
    gulp.watch('_scss/**/*.scss', ['scss']);
});

// @NOTE calling 'gulp' will watch files
gulp.task('default');
