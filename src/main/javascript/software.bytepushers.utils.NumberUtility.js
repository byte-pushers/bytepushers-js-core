/*global window, document, BytePushers*/
/*jslint unparam: true*/
(function (window, document, BytePushers) {
    'use strict';
    BytePushers = BytePushers || {};
    BytePushers.NumberUtility = BytePushers.namespace("software.bytepushers.utils.NumberUtility");
    BytePushers.NumberUtility.padLeft = function padLeft(number, length) {
        number = (number === undefined || number === null) ? "" : number;
        return (number.length >= length) ? number : padLeft("0" + number, length);
    };
    BytePushers.NumberUtility.padRight = function padRight(number, length) {
        number = (number === undefined || number === null) ? "" : number;
        return (number.length >= length) ? number : padRight(number + "0", length);
    };
    BytePushers.NumberUtility.isSingleDigit = function isSingleDigit(number) {
        return (0 < number && number <= 9) ? true : false;
    };
    BytePushers.NumberUtility.isNotANumber = function isNotANumber(d) {
        return isNaN(d);
    };
    BytePushers.NumberUtility.isANumber = function isANumber(d) {
        if (d === "") {
            return false;
        }
        return !isNaN(d);
    };
}(window, document, BytePushers));
/*jslint unparam: false*/