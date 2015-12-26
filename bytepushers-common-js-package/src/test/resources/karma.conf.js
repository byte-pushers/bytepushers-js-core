/**
 * Created by Tonté Pouncil on 3/21/15.
 */
module.exports = function(config) {
    config.set({
        basePath: '../../..',
        frameworks: ['jasmine', 'requirejs'],
        files: [
            'src/main/javascript/*.js',
            'src/test/javascript/**/*.js'
        ],
        exclude: ['src/main/javascript/com.bytepushers.base.app.js'],
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

