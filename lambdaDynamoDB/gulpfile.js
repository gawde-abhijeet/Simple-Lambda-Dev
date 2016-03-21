var gulp = require('gulp');
//var jshint = require('gulp-jshint');
//var jscs = require('gulp-jscs');
var args = require('yargs');

var $ = require('gulp-load-plugins')({lazy: true});

gulp.task('vet', function () {
    logMessage('Starting JSHint & JSCS');

    return gulp
        .src([
        './lambda/**/*.js',
        './*.js'
    ])
        .pipe($.if(args.verbose, $.print()))
        .pipe($.jscs())
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish', { verbose: true }))
        .pipe($.jshint.reporter('fail'));
});


//// Reusable Functions
function logMessage(msg) {
    if (typeof (msg) === 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) {
                $.util.log($.util.colors.blue(msg[item]));
            }
        }
    }
    else {
        $.util.log($.util.colors.blue(msg));
    }
}