/**
 * Created by tonte on 8/1/16.
 */
/*global window, BytePushers */
(function (BytePushers) {
    "use strict";
    var EVAL_IS_BAD__AVOID_THIS = eval,
        FUNCTION_CONSTRUCTOR_IS_BAD__AVOID_THIS = Function;

    BytePushers = BytePushers || {};
    BytePushers.util = BytePushers.util || BytePushers.namespace("software.bytepushers.util");
    BytePushers.util.Reflection = function () {
        var getFunctionArguments = function (func) {

                var functionArgumentMatch = func.toString().match(/\(.+?(?=\))\)/),
                    functionArguments = functionArgumentMatch[0].substring(1, functionArgumentMatch[0].length - 1).split(",").map(function (arg) {
                        // Ensure no inline comments are parsed and trim the whitespace.
                        return arg.replace(/\/\*.*\*\//, '').trim();
                    }).filter(function (arg) {
                        // Ensure no undefined values are added.
                        return arg;
                    }),
                    functionArgumentList = "";

                functionArguments.forEach(function (arg, argIndex, argArray) {
                    if (argIndex < argArray.length - 1) {
                        functionArgumentList += arg + ",";
                    } else {
                        functionArgumentList += arg;
                    }
                    // functionArgumentList += arg + ((argIndex < argArray.length - 1) ? "," : "");
                });

                return functionArgumentList;
            },
            replaceConstructor = function (originalFunctionString, ReflectedConstructor) {
                var reflectedFunctionAsString = originalFunctionString,
                    reflectedFunction,
                    matchResults,
                    superMethodCalls = [];

                matchResults = reflectedFunctionAsString.match(/[A-Za-z0-9\.]+\.prototype\.[A-Za-z0-9]+\.apply\(this,\s*\[\s*.*\]\s*\)/g);
                if (matchResults) {
                    matchResults.forEach(function (match) {
                        if (match) {
                            superMethodCalls.push = {
                                key: match,
                                value: EVAL_IS_BAD__AVOID_THIS(match.replace(match, ReflectedConstructor + match.substring(0, match.indexOf(".prototype")))) // jshint ignore:line
                            };
                        }
                    });

                    superMethodCalls.forEach(function (superCallMethod) {
                        reflectedFunctionAsString = reflectedFunctionAsString.replace(new RegExp(superCallMethod.key), superCallMethod.value);
                    });
                }


                matchResults = reflectedFunctionAsString.match(/[A-Za-z0-9\.]+\.prototype\.[A-Za-z0-9]+\.call\(this\s*,?(\s\w*,?)*\s*\)/g);
                if (matchResults) {
                    matchResults.forEach(function (match) {
                        if (match) {
                            superMethodCalls.push = {
                                key: match,
                                value: EVAL_IS_BAD__AVOID_THIS(match.replace(match, ReflectedConstructor + match.substring(0, match.indexOf(".prototype")))) // jshint ignore:line
                            };
                        }
                    });

                    superMethodCalls.forEach(function (superCallMethod) {
                        reflectedFunctionAsString = reflectedFunctionAsString.replace(new RegExp(superCallMethod.key), superCallMethod.value);
                    });
                }
                reflectedFunction = new FUNCTION_CONSTRUCTOR_IS_BAD__AVOID_THIS('return ' + reflectedFunctionAsString)(); // jshint ignore:line

                return reflectedFunction;
            },
            getClassRefPrototypeMethods = function (ClassRef, ReflectedConstructor) {
                var classRefPrototypeMethods = {},
                    classRefPrototypeMethod,
                    classRefPrototypeMethodName;

                for (classRefPrototypeMethodName in ClassRef.prototype) {
                    if (ClassRef.prototype.hasOwnProperty(classRefPrototypeMethodName)) {
                        if (classRefPrototypeMethodName !== "constructor" &&
                                classRefPrototypeMethodName !== "superclass" &&
                                Object.isFunction(ClassRef.prototype[classRefPrototypeMethodName])) {
                            classRefPrototypeMethod = ClassRef.prototype[classRefPrototypeMethodName];
                            classRefPrototypeMethods[classRefPrototypeMethodName] = replaceConstructor(classRefPrototypeMethod.toString(), ReflectedConstructor);
                        }
                    }
                }

                return classRefPrototypeMethods;
            },
            wrapConstructorWithReflectionCapabilities = function (ClassRef) {
                var WrappedSuperClassWithReflectionCapabilitiesConstructor,
                    wrappedSuperClassPrototypeMethods,
                    wrappedSuperClassPrototypeMethodName,
                    WrappedClassWithReflectionCapabilitiesConstructor,
                    wrappedClassWithReflectionCapabilitiesAsString = "",
                    functionArguments = getFunctionArguments(ClassRef),
                    originalClassAsString = ClassRef.toString(); //.replace(/\(.+?(?=\))\)/, "()");

                if (ClassRef.prototype.superclass) {
                    WrappedSuperClassWithReflectionCapabilitiesConstructor = wrapConstructorWithReflectionCapabilities(ClassRef.prototype.superclass);
                    wrappedSuperClassPrototypeMethods = getClassRefPrototypeMethods(ClassRef.prototype.superclass, WrappedSuperClassWithReflectionCapabilitiesConstructor);
                    originalClassAsString = originalClassAsString.replace(/.*superclass\.apply\(this,\s*\[\s*.*\]\s*\)\s*;*/, "\t\tthis.__proto__.superclass.apply(this, [" + functionArguments + "]);");
                    originalClassAsString = originalClassAsString.replace(/.*superclass\.call\(this\s*,?(\s\w*,?)*\s*\)\s*;?/, "\t\tthis.__proto__.superclass.call(this " + (functionArguments ? "," + functionArguments : "") + ");");
                    Object.defineProperty(WrappedSuperClassWithReflectionCapabilitiesConstructor.prototype, 'getMethod', {
                        enumerable: false,
                        value: function (methodName) {
                            var reflectionMethod;

                            if (WrappedSuperClassWithReflectionCapabilitiesConstructor.prototype.superclass) {
                                WrappedSuperClassWithReflectionCapabilitiesConstructor.prototype.superclass.prototype.getMethod.apply(this, [methodName]);
                            }

                            if (!reflectionMethod) {
                                reflectionMethod = this["_privates" + WrappedSuperClassWithReflectionCapabilitiesConstructor.name][methodName];//SuperClassConstructor.prototype.getReflectionMethod.apply(this, [methodName]);
                            }

                            return reflectionMethod;
                        }
                    });

                    for (wrappedSuperClassPrototypeMethodName in wrappedSuperClassPrototypeMethods) {
                        if (wrappedSuperClassPrototypeMethods.hasOwnProperty(wrappedSuperClassPrototypeMethodName)) {
                            if (wrappedSuperClassPrototypeMethodName) {
                                Object.defineProperty(WrappedSuperClassWithReflectionCapabilitiesConstructor.prototype, wrappedSuperClassPrototypeMethodName, {
                                    enumerable: false,
                                    value: wrappedSuperClassPrototypeMethods[wrappedSuperClassPrototypeMethodName]
                                });
                            }
                        }
                    }
                }

                // To expose the private functions, we create
                // a new function that goes trough the functions string
                // we could have done all string parsing in this class and
                // only associate the functions directly with string
                // manipulation here and not inside the new class,
                // but then we would have to expose the functions as string
                // in the code, which could lead to problems in the eval since
                // string might have semicolons, line breaks etc.

                //funcString += "new (";
                //funcString += "return ";
                wrappedClassWithReflectionCapabilitiesAsString += originalClassAsString.substring(0, originalClassAsString.length - 3) + "\n";
                wrappedClassWithReflectionCapabilitiesAsString += "\t\tthis._privates" + ClassRef.name + " = {};\n";
                wrappedClassWithReflectionCapabilitiesAsString += "\t\tthis._initPrivates = function(f) {\n";
                wrappedClassWithReflectionCapabilitiesAsString += "\t\t\tvar fs = f.toString();\n";
                wrappedClassWithReflectionCapabilitiesAsString += "\t\t\tthis._privates" + ClassRef.name + " = {};\n";
                wrappedClassWithReflectionCapabilitiesAsString += "\t\t\tvar pf = fs.match(/function\\s*?(\\w.*?)\\(/g);\n";
                wrappedClassWithReflectionCapabilitiesAsString += "\t\t\tif (pf != null){\n";
                wrappedClassWithReflectionCapabilitiesAsString += "\t\t\t\tfor (var i = 0, ii = pf.length; i < ii; i++) {\n";
                wrappedClassWithReflectionCapabilitiesAsString += "\t\t\t\t\tvar fn = pf[i].replace(/function\\s+/, '').replace('(', '').trim();\n";
                wrappedClassWithReflectionCapabilitiesAsString += "\t\t\t\t\tif (f.name != fn) {\n";
                wrappedClassWithReflectionCapabilitiesAsString += "\t\t\t\t\t\ttry {\n";
                wrappedClassWithReflectionCapabilitiesAsString += "\t\t\t\t\t\t\tthis._privates" + ClassRef.name + "[fn] = eval(fn);\n";
                wrappedClassWithReflectionCapabilitiesAsString += "\t\t\t\t\t\t} catch (e) {\n";
                wrappedClassWithReflectionCapabilitiesAsString += "\t\t\t\t\t\t\tif (e.name == 'ReferenceError') {\n";
                wrappedClassWithReflectionCapabilitiesAsString += "\t\t\t\t\t\t\t\tcontinue;\n";
                wrappedClassWithReflectionCapabilitiesAsString += "\t\t\t\t\t\t\t} else {\n";
                wrappedClassWithReflectionCapabilitiesAsString += "\t\t\t\t\t\t\t\tthrow e;\n";
                wrappedClassWithReflectionCapabilitiesAsString += "\t\t\t\t\t\t\t}\n";
                wrappedClassWithReflectionCapabilitiesAsString += "\t\t\t\t\t\t}\n";
                wrappedClassWithReflectionCapabilitiesAsString += "\t\t\t\t\t}\n";
                wrappedClassWithReflectionCapabilitiesAsString += "\t\t\t\t}\n";
                wrappedClassWithReflectionCapabilitiesAsString += "\t\t\t}\n";
                wrappedClassWithReflectionCapabilitiesAsString += "\t\t\tpf = fs.match(/\\w*?\\s+=\\s+function/g);\n";
                wrappedClassWithReflectionCapabilitiesAsString += "\t\t\tif (pf != null) {\n";
                wrappedClassWithReflectionCapabilitiesAsString += "\t\t\t\tfor (var i = 0, ii = pf.length; i < ii; i++) {\n";
                wrappedClassWithReflectionCapabilitiesAsString += "\t\t\t\t\tvar fn = pf[i].replace(/var\\s*/, '').replace(' ', '').replace('=', '').replace(' ', '').replace('function', '').replace(' ', '').replace('(', '');\n";
                wrappedClassWithReflectionCapabilitiesAsString += "\t\t\t\t\t\ttry {\n";
                wrappedClassWithReflectionCapabilitiesAsString += "\t\t\t\t\t\t\tthis._privates" + ClassRef.name + "[fn] = eval(fn);\n";
                wrappedClassWithReflectionCapabilitiesAsString += "\t\t\t\t\t\t} catch (e) {\n";
                wrappedClassWithReflectionCapabilitiesAsString += "\t\t\t\t\t\t\tif (e.name == 'ReferenceError') {\n";
                wrappedClassWithReflectionCapabilitiesAsString += "\t\t\t\t\t\t\t\tcontinue;\n";
                wrappedClassWithReflectionCapabilitiesAsString += "\t\t\t\t\t\t\t} else {\n";
                wrappedClassWithReflectionCapabilitiesAsString += "\t\t\t\t\t\t\t\tthrow e;\n";
                wrappedClassWithReflectionCapabilitiesAsString += "\t\t\t\t\t\t\t}\n";
                wrappedClassWithReflectionCapabilitiesAsString += "\t\t\t\t\t\t}\n";
                wrappedClassWithReflectionCapabilitiesAsString += "\t\t\t\t}\n";
                wrappedClassWithReflectionCapabilitiesAsString += "\t\t\t}\n";
                wrappedClassWithReflectionCapabilitiesAsString += "\t\t};\n\n";

                if (!ClassRef.prototype.superclass) {
                    wrappedClassWithReflectionCapabilitiesAsString += "\t\tthis._initPrivates(this.__proto__.superclass);\n";
                } else {
                    wrappedClassWithReflectionCapabilitiesAsString += "\t\tthis._initPrivates(this.__proto__.constructor);\n";
                }

                wrappedClassWithReflectionCapabilitiesAsString += "\t\tdelete this._initPrivates;\n";
                wrappedClassWithReflectionCapabilitiesAsString += "\n\t}";
                //funcString +=")();";
                WrappedClassWithReflectionCapabilitiesConstructor = new FUNCTION_CONSTRUCTOR_IS_BAD__AVOID_THIS(functionArguments, 'return ' + wrappedClassWithReflectionCapabilitiesAsString)(); // jshint ignore:line

                if (WrappedSuperClassWithReflectionCapabilitiesConstructor) {
                    WrappedClassWithReflectionCapabilitiesConstructor.prototype = BytePushers.inherit(WrappedSuperClassWithReflectionCapabilitiesConstructor.prototype);
                }
                if (ClassRef.prototype.superclass && ClassRef.prototype.constructor) {
                    WrappedClassWithReflectionCapabilitiesConstructor.prototype.constructor = WrappedClassWithReflectionCapabilitiesConstructor;
                }
                if (WrappedSuperClassWithReflectionCapabilitiesConstructor) {
                    WrappedClassWithReflectionCapabilitiesConstructor.prototype.superclass = WrappedSuperClassWithReflectionCapabilitiesConstructor;
                }

                return WrappedClassWithReflectionCapabilitiesConstructor;
            };

        this.getInstance = function (ClassRef, classConstructorArguments) {
            // get the functions as a string
            var WrappedClassWithReflectionCapabilitiesConstructor = wrapConstructorWithReflectionCapabilities(ClassRef),
                wrappedClassPrototypeMethods = getClassRefPrototypeMethods(ClassRef, WrappedClassWithReflectionCapabilitiesConstructor),
                wrappedClassPrototypeMethodName,
                wrappedClassWithReflectionCapabilitiesInstance;


            if (WrappedClassWithReflectionCapabilitiesConstructor) {
                Object.defineProperty(WrappedClassWithReflectionCapabilitiesConstructor.prototype, 'getMethod', {
                    enumerable: false,
                    value: function (methodName) {
                        var reflectionMethod;

                        if (WrappedClassWithReflectionCapabilitiesConstructor.prototype.superclass) {
                            reflectionMethod = WrappedClassWithReflectionCapabilitiesConstructor.prototype.superclass.prototype.getMethod.apply(this, [methodName]);
                        }

                        if (!reflectionMethod) {
                            reflectionMethod = this["_privates" + WrappedClassWithReflectionCapabilitiesConstructor.name][methodName];
                        }

                        return reflectionMethod;
                    }
                });

                for (wrappedClassPrototypeMethodName in wrappedClassPrototypeMethods) {
                    if (wrappedClassPrototypeMethods.hasOwnProperty(wrappedClassPrototypeMethodName)) {
                        if (wrappedClassPrototypeMethodName) {
                            Object.defineProperty(WrappedClassWithReflectionCapabilitiesConstructor.prototype, wrappedClassPrototypeMethodName, {
                                enumerable: false,
                                value: wrappedClassPrototypeMethods[wrappedClassPrototypeMethodName]
                            });
                        }
                    }
                }

                wrappedClassWithReflectionCapabilitiesInstance = new WrappedClassWithReflectionCapabilitiesConstructor(classConstructorArguments); //var instance = eval(funcString);
                return wrappedClassWithReflectionCapabilitiesInstance;
            }

            throw "WrappedClassWithReflectionCapabilitiesConstructor was not successfully created.";
        };
    };
}(BytePushers));
