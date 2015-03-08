var gulp = require('gulp')
var exec = require('child_process').exec

gulp.task('test', function() {
    exec('mocha', function(err, stdout, stderr) {
        console.log(err);
        console.log(stdout);
        console.log(stderr);
    });
});

gulp.task('watch', function() {
    gulp.watch('test/test.js', ['test']);
    gulp.watch('index.js', ['test']);
});

gulp.task('default', ['watch']);

