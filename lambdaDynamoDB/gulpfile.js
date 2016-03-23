var gulp = require('gulp');
var args = require('yargs').argv;
var config = require('./gulp.config')();
var $ = require('gulp-load-plugins')({lazy: true});

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

//// Reusable Functions

function startTests(singleRun, done) {
    var Server = require('karma').Server;
    var excludeFiles = [];
    var serverSpecs = config.serverIntegrationSpecs; 
    
    excludeFiles = [].concat(
        config.serverIntegrationSpecs,
        config.unitTestHelpers
    );    

    /**
     *  Deprecated since 0.13
     *
    karma.start({
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
     */

    /**
     * Using newer version of starting the karma test runner
     */
    
    new Server({
        configFile: __dirname + '/karma.conf.js',
        exclude: excludeFiles,
        singleRun: !!singleRun
    }, done).start(); 
}

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