/**
 * Created with IntelliJ IDEA.
 * User: pouncilt
 * Date: 3/24/13
 * Time: 3:31 PM
 * To change this template use File | Settings | File Templates.
 */
(function (window, document, BytePushers) {
BytePushers = BytePushers || {};
BytePushers.DOMUtility = BytePushers.namespace("software.bytepushers.utils.DOMUtility");
BytePushers.DOMUtility.addListener = null;
BytePushers.DOMUtility.removeListener = null;
BytePushers.DOMUtility.querySelector = null;
BytePushers.DOMUtility.querySelectorAll = null;
BytePushers.DOMUtility.filterMetaData = function (data) {
    "use strict";
    data = data.replace(/<meta\s[\w\W]*>/gi, "");
    return data;
};

// the implementation
if (typeof window.addEventListener === 'function') {
    BytePushers.DOMUtility.addListener = function (el, type, fn) {
        "use strict";
        el.addEventListener(type, fn, false);
    };
    BytePushers.DOMUtility.removeListener = function (el, type, fn) {
        "use strict";
        el.removeEventListener(type, fn, false);
    };
} else if (typeof document.attachEvent === 'function') { // IE
    BytePushers.DOMUtility.addListener = function (el, type, fn) {
        "use strict";
        el.attachEvent('on' + type, fn);
    };
    BytePushers.DOMUtility.removeListener = function (el, type, fn) {
        "use strict";
        el.detachEvent('on' + type, fn);
    };
} else { // older browsers
    BytePushers.DOMUtility.addListener = function (el, type, fn) {
        "use strict";
        el['on' + type] = fn;
    };
    BytePushers.DOMUtility.removeListener = function (el, type, fn) {
        "use strict";
        el['on' + type] = null;
    };
}

if (typeof document.querySelector === "function") {
    BytePushers.DOMUtility.querySelector = function (selector) {
        "use strict";
        return document.querySelector(selector);
    };
} else if (typeof document.getElementsByClassName === "function") {
    BytePushers.DOMUtility.querySelector = function (selector) {
        "use strict";
        return document.getElementsByClassName(selector);
    };
} else if (typeof $ === "function") {
    BytePushers.DOMUtility.querySelector = function (selector) {
        "use strict";
        return $(selector);
    };
} else {
    throw ("document.querySelector() method is not supported by your browser.  Please contact the administrator for this app.");
}

if (typeof document.querySelectorAll === "function") {
    BytePushers.DOMUtility.querySelectorAll = function (selector) {
        "use strict";
        return document.querySelectorAll(selector);
    };
} else if (typeof document.getElementsByClassName === "function") {
    BytePushers.DOMUtility.querySelectorAll = function (selector) {
        "use strict";
        return document.getElementsByClassName(selector);
    };
} else if (typeof $ === "function") {
    BytePushers.DOMUtility.querySelector = function (selector) {
        "use strict";
        return $(selector);
    };
} else {
    throw ("document.querySelectorAll() method is not supported by your browser.  Please contact the administrator for this app.");
}
})(window, document, BytePushers);