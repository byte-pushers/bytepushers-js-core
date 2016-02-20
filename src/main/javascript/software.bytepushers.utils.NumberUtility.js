(function (window, document, BytePushers) {
BytePushers = BytePushers || {};
BytePushers.NumberUtility = BytePushers.namespace("software.bytepushers.utils.NumberUtility");
BytePushers.NumberUtility.padLeft = function padLeft(number, length) {
	'use strict';
    number = (number === undefined || number === null) ? "" : number;
	return (number.length >= length) ? number : padLeft("0" + number, length);
};
BytePushers.NumberUtility.padRight = function padRight(number, length) {
	'use strict';
    number = (number === undefined || number === null) ? "" : number;
	return (number.length >= length) ? number : padRight(number + "0", length);
};
BytePushers.NumberUtility.isSingleDigit = function isSingleDigit(number) {
	'use strict';
	return (0 < number && number <= 9) ? true : false;
};
BytePushers.NumberUtility.isNotANumber = function isNotANumber(d) {
	'use strict';
	return isNaN(d);
};
BytePushers.NumberUtility.isANumber = function isANumber(d) {
	'use strict';
    if (d === "") {
        return false;
    }
	return !isNaN(d);
};
}(window, document, BytePushers));