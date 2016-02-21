var allTestFiles = [];
for (var file in window.__karma__.files) {
    if (window.__karma__.files.hasOwnProperty(file)) {
        if (/Spec\.js$/.test(file)) {
            allTestFiles.push(file);
        }
    }
}

//TODO find out how this works
/*Object.keys(window.__karma__.files).forEach(function(file) {
 if (TEST_REGEXP.test(file)) {
 // Normalize paths to RequireJS module names.
 // If you require sub-dependencies of test files to be loaded as-is (requiring file extension)
 // then do not normalize the paths
 var normalizedTestModule = file.replace(/^\/base\/|\.js$/g, '');
 console.info("file: " + file.toString());
 console.info("normalizedTestModule: " + normalizedTestModule);
 allTestFiles.push(normalizedTestModule);
 }
 });*/

require.config({
  baseUrl: '/base',

  paths: {
      'bytepushers': 'src/main/javascript/software.bytepushers.base.app',
      'bytepushersErrors': 'src/main/javascript/software.bytepushers.exceptions.Errors',
      'bytepushersDateConverter': 'src/main/javascript/software.bytepushers.utils.converters.date.DateConverter',
      'bytepushersDateUtility': 'src/main/javascript/software.bytepushers.utils.DateUtility',
      'bytepushersDOMUtility': 'src/main/javascript/software.bytepushers.utils.DOMUtility',
      'bytepushersNumberUtility': 'src/main/javascript/software.bytepushers.utils.NumberUtility',
      'bytepushersResourceLoader': 'src/main/javascript/software.bytepushers.utils.ResourceLoader'
  },

  shim: {
      bytepushers: {
          exports: 'BytePushers'
      },
      bytepushersErrors: {
          deps: ['bytepushers']
      },
      bytepushersDateConverter: {
          deps: ['bytepushers']
      },
      bytepushersDateUtility: {
          deps: ['bytepushers']
      },
      bytepushersDOMUtility: {
          deps: ['bytepushers']
      },
      bytepushersNumberUtility: {
          deps: ['bytepushers']
      },
      bytepushersResourceLoader: {
          deps: ['bytepushers']
      }
  },

  deps: allTestFiles,

  callback: window.__karma__.start
});
