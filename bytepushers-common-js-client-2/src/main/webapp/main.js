requirejs.config({
    paths: {
        'angular' : 'bower_components/angular/angular.min',
        'uiRouter': 'bower_components/angular-ui-router/release/angular-ui-router.min',
        'domReady': 'bower_components/domReady/domReady',
        'bytepushers': '../../../node_modules/bytepuhsers-common-js/bytepushers-common-js.min'
    },

    shim: {
        'angular': {
            exports: 'angular'
        },
        'uiRouter' : {
            deps : ['angular']
        },
        bytepushers: {
            exports: 'BytePushers'
        }
    },

    deps: ["./bootstrap"]
});