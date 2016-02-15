var VA_AMS = VA_AMS || {};
VA_AMS.NumberUtility = VA_AMS.namespace("gov.va.iam.acs.ams.utils.NumberUtility");
VA_AMS.NumberUtility.padLeft = function padLeft(number, length) {
	'use strict';
    number = (number === undefined || number === null) ? "" : number;
	return (number.length >= length) ? number : padLeft("0" + number, length);
};
VA_AMS.NumberUtility.padRight = function padRight(number, length) {
	'use strict';
    number = (number === undefined || number === null) ? "" : number;
	return (number.length >= length) ? number : padRight(number + "0", length);
};
VA_AMS.NumberUtility.isSingleDigit = function isSingleDigit(number) {
	'use strict';
	return (0 < number && number <= 9) ? true : false;
};
VA_AMS.NumberUtility.isNotANumber = function isNotANumber(d) {
	'use strict';
	return isNaN(d);
};
VA_AMS.NumberUtility.isANumber = function isANumber(d) {
	'use strict';
    if (d === "") {
        return false;
    }
	return !isNaN(d);
};