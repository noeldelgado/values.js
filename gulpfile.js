var gulp = require('gulp'),
    exec = require('child_process').exec,
    header = require('gulp-header'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    pkg = require('./package.json'),
    banner = ['/**',
        ' * <%= pkg.name %> - <%= pkg.description %>',
        ' * @version v<%= pkg.version %>',
        ' * @link <%= pkg.homepage %>',
        ' * @license <%= pkg.license %>',
        ' */',
        ''].join('\n');

gulp.task('test', function() {
    exec('mocha', function(err, stdout, stderr) {
        console.log(err);
        console.log(stdout);
        console.log(stderr);
    });
});

gulp.task('watch', function() {
    gulp.watch('test/test.js', ['test']);
    gulp.watch('source/values.js', ['test']);
});

gulp.task('dist', function() {
    return gulp.src(['source/values.js'])
        .pipe(rename(function(path) {
            path.basename += '.min';
        }))
        .pipe(uglify())
        .pipe(header(banner, {pkg : pkg}))
        .pipe(gulp.dest('dist/'));
});

gulp.task('default', ['watch']);

