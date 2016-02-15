/**
 * Created with IntelliJ IDEA.
 * User: pouncilt
 * Date: 3/24/13
 * Time: 3:31 PM
 * To change this template use File | Settings | File Templates.
 */
var VA_AMS = VA_AMS || {};
VA_AMS.DOMUtility = VA_AMS.namespace("gov.va.iam.acs.ams.utils.DOMUtility");
VA_AMS.DOMUtility.addListener = null;
VA_AMS.DOMUtility.removeListener = null;
VA_AMS.DOMUtility.querySelector = null;
VA_AMS.DOMUtility.querySelectorAll = null;
VA_AMS.DOMUtility.filterMetaData = function (data) {
    "use strict";
    data = data.replace(/<meta\s[\w\W]*>/gi, "");
    return data;
};

// the implementation
if (typeof window.addEventListener === 'function') {
    VA_AMS.DOMUtility.addListener = function (el, type, fn) {
        "use strict";
        el.addEventListener(type, fn, false);
    };
    VA_AMS.DOMUtility.removeListener = function (el, type, fn) {
        "use strict";
        el.removeEventListener(type, fn, false);
    };
} else if (typeof document.attachEvent === 'function') { // IE
    VA_AMS.DOMUtility.addListener = function (el, type, fn) {
        "use strict";
        el.attachEvent('on' + type, fn);
    };
    VA_AMS.DOMUtility.removeListener = function (el, type, fn) {
        "use strict";
        el.detachEvent('on' + type, fn);
    };
} else { // older browsers
    VA_AMS.DOMUtility.addListener = function (el, type, fn) {
        "use strict";
        el['on' + type] = fn;
    };
    VA_AMS.DOMUtility.removeListener = function (el, type, fn) {
        "use strict";
        el['on' + type] = null;
    };
}

if (typeof document.querySelector === "function") {
    VA_AMS.DOMUtility.querySelector = function (selector) {
        "use strict";
        return document.querySelector(selector);
    };
} else if (typeof document.getElementsByClassName === "function") {
    VA_AMS.DOMUtility.querySelector = function (selector) {
        "use strict";
        return document.getElementsByClassName(selector);
    };
} else if (typeof $ === "function") {
    VA_AMS.DOMUtility.querySelector = function (selector) {
        "use strict";
        return $(selector);
    };
} else {
    throw ("document.querySelector() method is not supported by your browser.  Please contact the administrator for this app.");
}

if (typeof document.querySelectorAll === "function") {
    VA_AMS.DOMUtility.querySelectorAll = function (selector) {
        "use strict";
        return document.querySelectorAll(selector);
    };
} else if (typeof document.getElementsByClassName === "function") {
    VA_AMS.DOMUtility.querySelectorAll = function (selector) {
        "use strict";
        return document.getElementsByClassName(selector);
    };
} else if (typeof $ === "function") {
    VA_AMS.DOMUtility.querySelector = function (selector) {
        "use strict";
        return $(selector);
    };
} else {
    throw ("document.querySelectorAll() method is not supported by your browser.  Please contact the administrator for this app.");
}