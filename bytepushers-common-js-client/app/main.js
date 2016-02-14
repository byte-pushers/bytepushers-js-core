requirejs.config({
    paths: {
        "angular" : "../node_modules/angular/angular.min",
        "uiRouter": "../node_modules/angular-ui-router/release/angular-ui-router.min",
        'domReady': 'bower_components/domReady/domReady',
        "bytepushers": "jspm_packages/github/byte-pushers/bytepushers-common-js@0.0.4/com.bytepushers.base.app"
    },

    shim: {
        "angular": {
            exports: "angular"
        },
        'uiRouter' : {
            deps : ['angular']
        }
    },

    deps: ["./bootstrap"]
});



//calls object.isArray successfully with expected output

require(["bytepushers", "app"], function(){
    console.log(Object.isArray([]));
    console.log(Object.isArray("str"));

});