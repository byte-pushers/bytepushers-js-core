/**
 * Created by Tonté Pouncil on 3/21/15.
 */
module.exports = function(config) {
    config.set({
        basePath: '../../..',
        frameworks: ['jasmine', 'requirejs'],
        files: [
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

