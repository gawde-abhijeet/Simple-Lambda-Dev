module.exports = function () {

    var config = {

        /**
         * File Paths
         */

        alljs: ['./lambda/**/*.js'],

        /**
         * Karma & Testing Settings
         */
        report: ['./report/'],
        serverIntegrationSpecs: ['./test/server-integration/**/*-unit-test.js'],
        unitTestHelpers: './testHelper.js',
        unitTestSpecs: './test/*-unit-test.js'
    };

    config.karma = getKarmaOptions();

    return config;

    ////////

    function getKarmaOptions() {
        var options = {
            files: [].concat(
                './lambda/**/*.js', 
                config.unitTestHelpers,
                config.unitTestSpecs
            ),
            excludes: [],
            coverage: {
                dir: config.report + 'coverage',
                reporters: [
                  { type: 'html', subdir: 'report-html' },
                  { type: 'lcov', subdir: 'report-lcov' },
                  { type: 'text-summary' },
                  { type: 'text' }
                ]
            },
            preprocessors: {} //{ '**/!(*-unit-test)+(.js)': 'coverage' }
        };

        options.preprocessors['./lambda/**/*.js'] = ['coverage'];

        return options;
    }

};