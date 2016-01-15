/**
 * Created by IsaacSnow on 1/14/16.
 */
require.config({
    baseUrl: '.'/*,
    urlArgs: 'v=1.0'*/
});

require([
    'app',
    'view1/view1',
    'view2/view2',
    'components/version/version.js',
    'components/version/version-directive.js',
    'components/version/interpolate-filter.js',
    'jspm_components/github/byte-pushers/bytepushers-common-js@0.0.3.js'
], function () {
    angular.bootstrap(document, ['myApp']);
});

/*
<script src="app.js"></script>
<script src="view1/view1.js"></script>
<script src="view2/view2.js"></script>
<script src="components/version/version.js"></script>
<script src="components/version/version-directive.js"></script>
<script src="components/version/interpolate-filter.js"></script>
*/
