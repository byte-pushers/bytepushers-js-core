/**
 * Created by tonte on 10/4/17.
 */
/*global window, document*/
/* jshint -W108, -W109 */
/* jslint bitwise: true, unparam: true, regexp: true, this: true*/

(function () {
    'use strict';

    /****************************************************************************************************
     * BEGIN Object Extensions */
    /**
     * <p>Static function that tells you whether an object is an array or not.</p>
     * @static
     * @param <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures">Object of some type</a> The object that will be tested to see if it is an array.
     * @returns <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean">Boolean</a> True if an object is an array, otherwise false.
     * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
     */
    Object.isArray = function (someArray) {
        var result = false;
        if (Object.isDefined(someArray)) {
            if (someArray.constructor.toString().indexOf("Array") > -1) {
                result = true;
            }
        }

        return result;
    };

    /**
     * <p>Static function that tells you whether an object is a date or not.</p>
     * @static
     * @param <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures">Object of some type</a> The object that will be tested to see if it is a date.
     * @returns <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean">Boolean</a> True if an object is an date, otherwise false.
     * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
     */
    Object.isDate = function (someDate) {
        var result = false;
        if (Object.isDefined(someDate)) {
            if (typeof someDate === "object" && someDate instanceof Date) {
                result = true;
            }
        }

        return result;
    };
    /**
     * <p>Static function that tells you whether an object is a string or not.</p>
     * @static
     * @param <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures">Object of some type</a> The object that will be tested to see if it is a string.
     * @returns <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean">Boolean</a> True if an object is an string, otherwise false.
     * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
     */
    Object.isString = function (someString) {
        var result = false;
        if (Object.isDefined(someString)) {
            if (typeof someString === "string" || (typeof someString === "object" && someString instanceof String)) {
                if (someString.trim().length > 0) {
                    result = true;
                }
            }
        }

        return result;
    };

    /**
     * <p>Static function that tells you whether an object is numeric or not.</p>
     * @static
     * @param <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures">Object of some type</a> The object that will be tested to see if it is numeric.
     * @returns <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean">Boolean</a> True if an object is numeric, otherwise false.
     * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
     */
    Object.isNumeric = function (someNumber) {
        var result = false;
        if (Object.isDefined(someNumber) && !isNaN(someNumber)) {
            if (typeof someNumber === "number" || (typeof someNumber === "object" && someNumber instanceof Number)) {
                result = true;
            }
        }

        return result;
    };

    /**
     * <p>Static function that tells you whether an object is a boolean or not.</p>
     * @static
     * @param <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures">Object of some type</a> The object that will be tested to see if it is a boolean.
     * @returns <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean">Boolean</a> True if an object is a boolean, otherwise false.
     * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
     */
    Object.isBoolean = function (someBoolean) {
        var result = false;
        if (Object.isDefined(someBoolean)) {
            if (typeof someBoolean === "boolean" || (typeof someBoolean === "object" && someBoolean instanceof Boolean)) {
                result = true;
            }
        }

        return result;
    };

    /**
     * <p>Static function that tells you whether an object is defined or not.</p>
     * @static
     * @param <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures">Object of some type</a> The object that will be tested to see if it is defined.
     * @returns <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean">Boolean</a> True if an object is defined, otherwise false.
     * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
     */
    Object.isDefined = function (target) {
        var result = false;
        if (target !== undefined && target !== null) {
            result = true;
        }
        return result;
    };
    Object.isRegEx = function (someRegEx) {
        var result = false;

        if (Object.isDefined(someRegEx)) {
            if (typeof someRegEx === "object" || someRegEx instanceof RegExp) {
                result = true;
            }
        }

        return result;
    };
    Object.getProperty = function (obj, p) {
        var pFunction = "get" + p.substring(0, 1).toUpperCase() + p.substring(1),
            value = null;

        if (Object.isString(obj)) {
            obj = JSON.parse(obj);
            value = obj[p];
        } else {
            if (Object.hasProperty(obj, p)) {
                value = obj[p];
            } else if (typeof obj[pFunction] === "function") {
                value = obj[pFunction]();
            }
        }

        return value;
    };
    Object.setProperty = function (obj, p, v) {
        var pFunction = "set" + p.substring(0, 1).toUpperCase() + p.substring(1);

        if (Object.hasProperty(obj, p)) {
            obj[p] = v;
        } else if (typeof obj[pFunction] === "function") {
            obj[pFunction](v);
        }
    };
    Object.hasProperty = function (obj, p) {
        var hasProperty = false;

        if (obj.hasOwnProperty(p)) {
            hasProperty = true;
        }

        return hasProperty;
    };
    Object.hasFunction = function (obj, p) {
        var hasFunction = false,
            pSetFunction = "set" + p.substring(0, 1).toUpperCase() + p.substring(1),
            pGetFunction = "get" + p.substring(0, 1).toUpperCase() + p.substring(1);

        if (typeof obj[pSetFunction] === "function") {
            hasFunction = true;
        } else if (typeof obj[pGetFunction] === "function") {
            hasFunction = true;
        }

        return hasFunction;
    };
    Object.isFunction = function (target) {
        var isFunction = false;

        if (Object.isDefined(target)) {
            if (typeof target === "function") {
                isFunction = true;
            }
        }

        return isFunction;
    };

    Object.isConstructorFunction = function (targetFunction) {
        var isConstructorFunction = false,
            isNotFirstLetterUppercase;

        if (Object.isFunction(targetFunction)) {
            isNotFirstLetterUppercase = !(/^[A-Z]/.test(targetFunction.name));
            isConstructorFunction = true;
        } else {
            throw new BytePushers.exceptions.InvalidParameterException("Function(" + targetFunction + ") is not a Function.");
        }

        if (isNotFirstLetterUppercase) {
            throw new BytePushers.exceptions.InvalidParameterException("Fist letter of Function(" + targetFunction + ") name must be capitalized.");
        }

        return isConstructorFunction;
    };

    if (Function.prototype.name === undefined) {
        // Add a custom property to all function values
        // that actually invokes a method to get the value
        Object.defineProperty(Function.prototype, 'name', {
            get: function () {
                return (/function\s([^(]*)/).exec(this)[1];
            }
        });
    }
    /**
     * <p>Static convenience function that determines whether an object is defined and not null.
     *
     * @static
     * @param {Object} someObject The object that will be tested to see if it is defined and not null.
     * @returns {boolean} True if an object is defined and not null, otherwise returns false.
     */
    Object.isDefinedAndNotNull = function (someObject) {
        var result = false;

        if (someObject !== undefined && someObject !== null) {
            result = true;
        }

        return result;
    };

    /**
     * <p>Static convenience function that determines whether an object is undefined or null.
     *
     * @static
     * @param {Object} someObject The object that will be tested to see if it is undefined or null.
     * @returns {boolean} True if an object is undefined and null, otherwise returns false.
     */
    Object.isUndefinedOrNull = function (someObject) {
        var result = false;

        if (someObject === undefined || someObject === null) {
            result = true;
        }

        return result;
    };

    /* END Object Extensions *
     ****************************************************************************************************/
}());
