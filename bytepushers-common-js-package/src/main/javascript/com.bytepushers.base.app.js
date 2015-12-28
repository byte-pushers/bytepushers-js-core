/**
 * Created by tonte on 11/29/15.
 */
//console.info("************************************************************");
//console.info("inside app.js");
(function(window, document, undefined) {
    'use strict';

    if (!Array.prototype.every) {
        Array.prototype.every = function (fun /*, thisp */) {
            "use strict";

            if (this === null) {
                throw new TypeError();
            }

            var t = Object(this);
            var len = t.length >>> 0;
            if (typeof fun !== "function") {
                throw new TypeError();
            }

            var thisp = arguments[1];
            for (var i = 0; i < len; i++) {
                if (i in t && !fun.call(thisp, t[i], i, t))
                    return false;
            }

            return true;
        };
    }

    // Production steps of ECMA-262, Edition 5, 15.4.4.18
    // Reference: http://es5.github.com/#x15.4.4.18
    if ( !Array.prototype.forEach ) {

        Array.prototype.forEach = function forEach ( callback, thisArg ) {

            var T, k;

            if ( this === null ) {
                throw new TypeError( "this is null or not defined" );
            }

            // 1. Let O be the result of calling ToObject passing the |this| value as the argument.
            var O = Object(this);

            // 2. Let lenValue be the result of calling the Get internal method of O with the argument "length".
            // 3. Let len be ToUint32(lenValue).
            var len = O.length >>> 0; // Hack to convert O.length to a UInt32

            // 4. If IsCallable(callback) is false, throw a TypeError exception.
            // See: http://es5.github.com/#x9.11
            if ( {}.toString.call(callback) !== "[object Function]" ) {
                throw new TypeError( callback + " is not a function" );
            }

            // 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
            if ( thisArg ) {
                T = thisArg;
            }

            // 6. Let k be 0
            k = 0;

            // 7. Repeat, while k < len
            while( k < len ) {

                var kValue;

                // a. Let Pk be ToString(k).
                //   This is implicit for LHS operands of the in operator
                // b. Let kPresent be the result of calling the HasProperty internal method of O with argument Pk.
                //   This step can be combined with c
                // c. If kPresent is true, then
                if ( Object.prototype.hasOwnProperty.call(O, k) ) {

                    // i. Let kValue be the result of calling the Get internal method of O with argument Pk.
                    kValue = O[ k ];

                    // ii. Call the Call internal method of callback with T as the this value and
                    // argument list containing kValue, k, and O.
                    callback.call( T, kValue, k, O );
                }
                // d. Increase k by 1.
                k++;
            }
            // 8. return undefined
        };
    }

    if (!Array.prototype.some)
    {
        Array.prototype.some = function(fun /*, thisp */)
        {
            "use strict";

            if (this === null)
                throw new TypeError();

            var t = Object(this);
            var len = t.length >>> 0;
            if (typeof fun != "function")
                throw new TypeError();

            var thisp = arguments[1];
            for (var i = 0; i < len; i++)
            {
                if (i in t && fun.call(thisp, t[i], i, t))
                    return true;
            }

            return false;
        };
    }

    if (!Array.prototype.isArray) {
        Array.prototype.isArray = function (arg) {
            "use strict";
            var targetArray = (arg)? arg: this;
            return Object.prototype.toString.call(targetArray) === "[object Array]";
        };
    }

    /* We need to tell jshint what variables are being exported */
    /* global BytePushers: true
     *
     */

    var BytePushers = window.BytePushers || (window.BytePushers = {});

    BytePushers.namespace = function (ns_string) {
        'use strict';
        var parts = ns_string.split('.'), parent = BytePushers;
        // strip redundant leading global
        if (parts[0] === "BytePushers") {
            parts = parts.slice(1);
        }
        parts.forEach(function (part, index) {
            // create a property if it doesn't exist
            if (typeof parent[part] === "undefined") {
                parent[part] = {};
            }
            parent = parent[part];
        });
        return parent;
    };

    /**
     * defineClass() -- a utility function for defining JavaScript classes.
     *
     * This function expects a single object as its only argument.  It defines
     * a new JavaScript class based on the data in that object and returns the
     * constructor function of the new class.  This function handles the repetitive
     * tasks of defining classes: setting up the prototype object for correct
     * inheritance, copying methods from other types, and so on.
     *
     * The object passed as an argument should have some or all of the
     * following properties:
     *
     *      name: the name of the class being defined.
     *            If specified, this value will be stored in the classname
     *            property of the prototype object.
     *
     *    extend: The constructor of the class to be extended.  If omitted,
     *            the Object() constructor will be used.  This value will
     *            be stored in the superclass property of the prototype object.
     *
     * construct: The constructor function for the class. If omitted, a new
     *            empty function will be used.  This value becomes the return
     *            value of the function, and is also stored in the constructor
     *            property of the prototype object.
     *
     *   methods: An object that specifies the instance methods (and other shared
     *            properties) for the class.  The properties of this object are
     *            copied into the prototype object of the class.  If omitted,
     *            an empty object is used instead.  Properties named
     *            "classname", "superclass", and "constructor" are reserved
     *            and should not be used in this object.
     *
     *   statics: An object that specifies the static methods (and other static
     *            properties) for the class.  The properties of this object become
     *            properties of the constructor function.  If omitted, an empty
     *            object is used instead.
     *
     *   borrows: A constructor function or array of constructor functions.
     *            The instance methods of each of the specified classes are copied
     *            into the prototype object of this new class so that the
     *            new class borrows the methods of each specified class.
     *            Constructors are processed in the order they are specified,
     *            so the methods of a class listed at the end of the array may
     *            overwrite the methods of those specified earlier. Note that
     *            borrowed methods are stored in the prototype object before
     *            the properties of the methods object above.  Therefore,
     *            methods specified in the methods object can overwrite borrowed
     *            methods. If this property is not specified, no methods are
     *            borrowed.
     *
     *  provides: A constructor function or array of constructor functions.
     *            After the prototype object is fully initialized, this function
     *            verifies that the prototype includes methods whose names and
     *            number of arguments match the instance methods defined by each
     *            of these classes.  No methods are copied; this is simply an
     *            assertion that this class "provides" the functionality of the
     *            specified classes.  If the assertion fails, this method will
     *            throw an exception.  If no exception is thrown, any
     *            instance of the new class can also be considered (using "duck
     *            typing") to be an instance of these other types.  If this
     *            property is not specified, no such verification is performed.
     **/
    BytePushers.defineClass = function (data) {
        // Extract the fields we'll use from the argument object.
        // Set up default values.
        var classname = data.name;
        var superclass = data.extend || Object;
        var constructor = data.construct || function() {};
        var methods = data.methods || {};
        var statics = data.statics || {};
        var borrows;
        var provides;

        // Borrows may be a single constructor or an array of them.
        if (!data.borrows) borrows = [];
        else if (data.borrows instanceof Array) borrows = data.borrows;
        else borrows = [ data.borrows ];

        // Ditto for the provides property.
        if (!data.provides) provides = [];
        else if (data.provides instanceof Array) provides = data.provides;
        else provides = [ data.provides ];

        // Create the object that will become the prototype for our class.
        var proto = new superclass();

        // Delete any noninherited properties of this new prototype object.
        for(var p1 in proto)
            if (proto.hasOwnProperty(p1)) delete proto[p1];

        // Borrow methods from "mixin" classes by copying to our prototype.
        for(var i1 = 0; i1 < borrows.length; i1++) {
            var c1 = data.borrows[i1];
            borrows[i1] = c1;
            // Copy method properties from prototype of c to our prototype
            for(var p2 in c1.prototype) {
                if (typeof c1.prototype[p2] != "function") continue;
                proto[p2] = c1.prototype[p2];
            }
        }

        // Copy instance methods to the prototype object
        // This may overwrite methods of the mixin classes
        for(var p3 in methods) proto[p3] = methods[p3];

        // Set up the reserved "constructor", "superclass", and "classname"
        // properties of the prototype.
        proto.constructor = constructor;
        proto.superclass = superclass;
        // classname is set only if a name was actually specified.
        if (classname) proto.classname = classname;

        // Verify that our prototype provides all of the methods it is supposed to.
        for(var i2 = 0; i2 < provides.length; i2++) {  // for each class
            var c2 = provides[i2];
            for(var p4 in c2.prototype) {   // for each property
                if (typeof c2.prototype[p4] != "function") continue;  // methods only
                if (p4 == "constructor" || p4 == "superclass") continue;
                // Check that we have a method with the same name and that
                // it has the same number of declared arguments.  If so, move on
                if (p4 in proto &&
                    typeof proto[p4] == "function" &&
                    proto[p4].length == c2.prototype[p4].length) continue;
                // Otherwise, throw an exception
                throw new Error("Class " + classname + " does not provide method "+
                    c2.classname + "." + p4);
            }
        }

        // Associate the prototype object with the constructor function
        constructor.prototype = proto;

        // Copy static properties to the constructor
        for(var p5 in statics) constructor[p5] = statics[p5];

        // Finally, return the constructor function
        return constructor;
    };

    BytePushers.isArrayLike = function (x) {
        if (x instanceof Array) return true; // Real arrays are array-like
        if (!("length" in x)) return false;  // Arrays must have a length property
        if (typeof x.length != "number") return false;  // Length must be a number
        if (x.length < 0) return false;                 // and nonnegative
        if (x.length > 0) {
            // If the array is nonempty, it must at a minimum
            // have a property defined whose name is the number length-1
            if (!((x.length-1) in x)) return false;
        }
        return true;
    };

    // Return true if O has methods with the same name and arity as all
    // methods in I.prototype. Otherwise, return false.  Throws an exception
    // if I is a built-in type with nonenumerable methods.
    BytePushers.provides = function (O, I) {
        // If O actually is an instance of I, it obviously looks like I
        if (O instanceof I) return true;

        // If a constructor was passed instead of an object, use its prototype
        if (typeof O == "function") O = O.prototype;

        // The methods of built-in types are not enumerable, and we return
        // undefined.  Otherwise any object would appear to provide any of
        // the built-in types.
        if (I == Array || I == Boolean || I == Date || I == Error ||
            I == Function || I == Number || I == RegExp || I == String)
            return undefined;

        var proto = I.prototype;
        for(var p6 in proto) {  // Loop through all properties in I.prototype
            // Ignore properties that are not functions
            if (typeof proto[p6] != "function") continue;
            // If O does not have a property by the same name return false
            if (!(p6 in O)) return false;
            // If that property is not a function, return false
            if (typeof O[p6] != "function") return false;
            // If the two functions are not declared with the same number
            // of arguments return false.
            if (O[p6].length != proto[p6].length) return false;
        }
        // If all the methods check out, we can finally return true.
        return true;
    };

    // This function creates a new enumerated type. The argument object specifies // the names and values of each instance of the class. The return value
    // is a constructor function that identifies the new class. Note, however
    // that the constructor throws an exception: you can't use it to create new
    // instances of the type. The returned constructor has properties that // map the name of a value to the value itself, and also a values array, // a foreach() iterator function
    BytePushers.enumeration = function (namesToValues) {
        // This is the dummy constructor function that will be the return value.
        var enumeration = function() { throw "Can't Instantiate Enumerations"; };
        // Enumerated values inherit from this object.
        var proto = enumeration.prototype = {
            constructor: enumeration, // Identify type
            toString: function() { return this.name;}, // Return name
            valueOf: function() { return this.value; }, // Return value
            toJSON: function() { return this.name; } // For serialization
        };

        enumeration.values = []; // An array of the enumerated value objects

        // Now create the instances of this new type.
        for (var name in namesToValues) {        // For each value
            var e = inherit(proto);         // Create an object to represent it
            e.name = name;                  // Give it a name
            e.value = namesToValues[name];  // And a value
            enumeration[name] = e;          // Make it a property of constructor
            enumeration.values.push(e);     // And store in the values array
        }

        // A class method for iterating the instances of the class
        enumeration.foreach = function(f,c) {
            for(var i3 = 0; i3 < this.values.length; i3++) f.call(c,this.values[i3]);
        };
        // Return the constructor that identifies the new type
        return enumeration;
    };
})(window, document);
//console.info("end of app.js");
//console.info("************************************************************");