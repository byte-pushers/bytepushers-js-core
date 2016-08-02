var allTestFiles = [];
for (var file in window.__karma__.files) {
    if (window.__karma__.files.hasOwnProperty(file)) {
        if (/[Ss]pec\.js$/.test(file)) {
            allTestFiles.push(file);
        }
    }
}

require.config({
  baseUrl: '/base',

  paths: {
      'bytepushers': 'src/main/javascript/software.bytepushers.BytePushers',
      'bytepushersErrors': 'src/main/javascript/software.bytepushers.exceptions.Errors',
      'bytepushersFiltersProptery': 'src/main/javascript/software.bytepushers.filters.GenericPropertyFilter',
      'bytepushersDateConverter': 'src/main/javascript/software.bytepushers.utils.converters.date.DateConverter',
      'bytepushersDateUtility': 'src/main/javascript/software.bytepushers.utils.DateUtility',
      'bytepushersDOMUtility': 'src/main/javascript/software.bytepushers.utils.DOMUtility',
      'bytepushersNumberUtility': 'src/main/javascript/software.bytepushers.utils.NumberUtility',
      'bytepushersResourceLoader': 'src/main/javascript/software.bytepushers.utils.ResourceLoader',
      'bytepushersReflection': 'src/main/javascript/software.bytepushers.utils.Reflection',
      'BaseEntity': 'src/test/javascript/support/software.bytepushers.model.BaseEntity',
      'Person': 'src/test/javascript/support/software.bytepushers.model.Person'
  },

  shim: {
      bytepushers: {
          exports: 'BytePushers'
      },
      bytepushersErrors: {
          deps: ['bytepushers']
      },
      bytepushersFiltersProptery: {
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
      },
      bytepushersReflection: {
          deps: ['bytepushers']
      },
      BaseEntity: {
          deps: ['bytepushers']
      },
      Person: {
          deps: ['bytepushers', 'BaseEntity']
      }
  },

  deps: allTestFiles,

  callback: window.__karma__.start
});
