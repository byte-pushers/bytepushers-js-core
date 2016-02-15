requirejs.config({
    paths: {
        'angular' : '../node_modules/angular/angular.min',
        'uiRouter': '../node_modules/angular-ui-router/release/angular-ui-router.min',
        'domReady': 'bower_components/domReady/domReady',
        /*'bytepushers': ['jspm_packages/github/byte-pushers/bytepushers-common-js@0.0.4/com.bytepushers.base.app']*/
        'bytepushers': 'jspm_packages/github/byte-pushers/bytepushers-common-js@0.0.4/index'
    },

    shim: {
        'angular': {
            exports: 'angular'
        },
        'uiRouter' : {
            deps : ['angular']
        }
    },

    deps: ["./bootstrap"]
});