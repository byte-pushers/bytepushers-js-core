/**
 * Created by Tonté Pouncil on 3/21/15.
 */
var JASMINE="node_modules/jasmine-core/lib/**/*.js",
    JASMINE_ADAPTER = "node_modules/karma-jasmine/lib/adapter.js",
    REQUIRE = "node_modules/requirejs/bin/r.js",
    REQUIRE_ADAPTER = "node_modules/karma-requirejs/lib/adapter.js",
    ANGULAR_MOCKS = "node_modules/angular-mocks/angular-mocks.js";

module.exports = function(config) {
    config.set({
        basePath: '../../..',
        frameworks: ['jasmine', 'requirejs'],
        files: [
            JASMINE,
            JASMINE_ADAPTER,
            REQUIRE,
            REQUIRE_ADAPTER,

            {pattern: 'node_modules/requirejs/require.js', included: false},
            {pattern: 'src/main/javascript/*.js', included: false},
            {pattern: 'src/test/javascript/**/*.js', included: false},
            'src/test/javascript/test-main.js'
        ],
        exclude: [
            'src/test/resources/karma.conf*.js',
            'src/main/javascript/com.bytepushers.base.app.js'
        ],
        reporters: ['progress'],
        port: 9876,
        logLevel: config.LOG_INFO,
        browsers: ['PhantomJS'],
        singleRun: false,
        autoWatch: true,
        plugins: [
            'karma-jasmine',
            'karma-requirejs',
            'karma-phantomjs-launcher'
        ]
    });
};

