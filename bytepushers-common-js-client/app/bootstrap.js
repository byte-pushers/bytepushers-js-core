define([
    'require',
    'angular',
    'app',
    'routes'
], function (require, ng) {

    require(['domReady!'], function (document) {
        ng.bootstrap(document, ['app']);
    });
});