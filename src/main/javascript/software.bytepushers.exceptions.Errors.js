/*global VA_AMS*/

VA_AMS = VA_AMS || {};
VA_AMS.exceptions = VA_AMS.namespace("gov.va.iam.acs.ams.exceptions");
VA_AMS.exceptions.InvalidParameterException = function (message) {
	"use strict";
	Error.call(this, message);
	VA_AMS.exceptions.InvalidParameterException.prototype = new Error();
	this.name = "VA_AMS.exceptions.InvalidParameterException";
	this.message = message;
};
VA_AMS.exceptions.InvalidParameterException.prototype.toString = function() {
	return this.name + "(" + this.message + ")";
};
VA_AMS.exceptions.NullPointerException = function (message) {
	"use strict";
	Error.call(this, message);
	VA_AMS.exceptions.NullPointerException.prototype = new Error();
	this.name = "VA_AMS.exceptions.NullPointerException";
	this.message = message;
};
VA_AMS.exceptions.NullPointerException.prototype.toString = function() {
	return this.name + "(" + this.message + ")";
};
VA_AMS.exceptions.ExpectedArrayIsEmptyException = function (message) {
	"use strict";
	Error.call(this, message);
	VA_AMS.exceptions.ExpectedArrayIsEmptyException.prototype = new Error();
	this.name = "VA_AMS.exceptions.ExpectedArrayIsEmptyException";
	this.message = message;
};
VA_AMS.exceptions.ExpectedArrayIsEmptyException.prototype.toString = function() {
	return this.name + "(" + this.message + ")";
};
VA_AMS.exceptions.InvalidDateRangeException = function (message) {
	"use strict";
	Error.call(this, message);
	VA_AMS.exceptions.InvalidDateRangeException.prototype = new Error();
	this.name = "VA_AMS.exceptions.InvalidDateRangeException";
	this.message = message;
};
VA_AMS.exceptions.InvalidDateRangeException.prototype.toString = function() {
	return this.name + "(" + this.message + ")";
};