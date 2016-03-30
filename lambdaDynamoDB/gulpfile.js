var gulp = require('gulp');
var mocha = require('gulp-mocha');
var args = require('yargs').argv;
var config = require('./gulp.config')();
var $ = require('gulp-load-plugins')({ lazy: true });
var del = require('del');
var runSequence = require('run-sequence');
var tape = require('gulp-tape');
var tapColorize = require('tap-colorize');

gulp.task('vet', function () {
    logMessage('Analyzing source with JSHint & JSCS');

    return gulp
        .src(config.alljs)
        .pipe($.if(args.verbose, $.print()))
        .pipe($.jscs())
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish', { verbose: true }))
        .pipe($.jshint.reporter('fail'));
});

gulp.task('test', ['vet'], function (done) {
    startTests(true /* single run */, done);
});

gulp.task('clean', function () {
    return del(['publish']);
});

gulp.task('js', function () {
    return gulp.src('lambda/**/*.js')
        .pipe(gulp.dest('publish/'));

});

gulp.task('default', function (callback) {
    return runSequence(
        ['clean'],
        ['js'],
        callback
    );
});

gulp.task('tape-test', function () {
    return gulp.src('tape-tests/*.js')
    .pipe(tape({
        reporter: tapColorize()
    }));
});

gulp.task('mocha-test', function () {
    return gulp.src('./test/comments-unit-test.js', { read: false })
		// gulp-mocha needs filepaths so you can't have any plugins before it 
		.pipe(mocha({ reporter: 'nyan' }));
});


//// Reusable Functions

// Initiates the Karma Server for running automated unit tests
function startTests(singleRun, done) {
    var karmaServer = require('karma').Server;
    var excludeFiles = [];
    var serverSpecs = config.serverIntegrationSpecs; 
    
    excludeFiles = [].concat(
        config.serverIntegrationSpecs
    );    

    karmaServer.start({
        configFile: __dirname + '/karma.conf.js',
        exclude: excludeFiles,
        singleRun: !!singleRun
    }, karmaCompleted);

    function karmaCompleted(karmaResult){
        logMessage('karma completed!');

        if (karmaResult === 1) {
            done('karma: test failed with code ' + karmaResult);
        }
        else {
            done();
        }
    }
}

// Gulp log messsages colored in blue
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