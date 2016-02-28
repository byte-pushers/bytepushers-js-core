requirejs.config({
    paths: {
        'angular' : 'bower_components/angular/angular.min',
        'uiRouter': 'bower_components/angular-ui-router/release/angular-ui-router.min',
        'domReady': 'bower_components/domReady/domReady',
        'bytepushers': ['jspm_packages/github/byte-pushers/bytepushers-common-js@0.0.4/com.bytepushers.base.app']
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