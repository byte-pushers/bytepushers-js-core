var allTestFiles = [];
for (var file in window.__karma__.files) {
    if (window.__karma__.files.hasOwnProperty(file)) {
        if (/Spec\.js$/.test(file)) {
            allTestFiles.push(file);
        }
    }
}

require.config({
  baseUrl: '/base',

  paths: {
      'bytepushers': 'src/main/javascript/software.bytepushers.BytePushers',
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
