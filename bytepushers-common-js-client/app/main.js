requirejs.config({
    baseUrl: '.',
    paths: {
        'domReady': 'bower_components/domReady/domReady',
        "angular" : "../node_modules/angular/angular.min",
        "uiRouter": "../node_modules/angular-ui-router/release/angular-ui-router.min",
        "bytepushers": "jspm_packages/github/byte-pushers/bytepushers-common-js@0.0.4"
    },
    shim: {
        "angular": {
            exports: "angular"
        },
        "uiRouter": {
            deps: ["angular"]
        },
        "bytepushers" : {
            exports: "BytePushers"
        }
    },
    deps: [
        // kick start application... see bootstrap.js
        './bootstrap'
    ]
});