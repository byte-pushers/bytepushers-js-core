/*global window, document, BytePushers*/
/*jslint unparam: true*/
(function (window, document, BytePushers) {
    'use strict';
    BytePushers = BytePushers || {};
    BytePushers.DateUtility = BytePushers.namespace("software.bytepushers.utils.DateUtility");
    BytePushers.DateUtility.date_sort_asc = function (date1, date2) {
        // This is a comparison function that will result in dates being sorted in
        // ASCENDING order. As you can see, JavaScript's native comparison operators
        // can be used to compare dates. This was news to me.
        if (date1 > date2) {
            return 1;
        }
        if (date1 < date2) {
            return -1;
        }
        return 0;
    };
    BytePushers.DateUtility.date_sort_desc = function (date1, date2) {
        // This is a comparison function that will result in dates being sorted in
        // DESCENDING order.
        if (date1 > date2) {
            return -1;
        }
        if (date1 < date2) {
            return 1;
        }
        return 0;
    };
    /*checks if string passed in is valid MM/DD/YYYY date*/
    BytePushers.DateUtility.isValidDateString = function (dateString) {
        /*credit: https://stackoverflow.com/questions/6177975/how-to-validate-date-with-format-mm-dd-yyyy-in-javascript/6178341#6178341*/

        /* First check for the pattern */
        if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString)) { return false; }

        /* Parse the date parts to integers */
        var parts = dateString.split("/"),
            day = parseInt(parts[1], 10),
            month = parseInt(parts[0], 10),
            year = parseInt(parts[2], 10),
            monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

        /* Check the ranges of month and year */
        if (year < 1000 || year > 3000 || month === 0 || month > 12) { return false; }

        /* Adjust for leap years */
        if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)) { monthLength[1] = 29; }

        /* Check the range of the day */
        return day > 0 && day <= monthLength[month - 1];
    };
    /*formats date to string in DD/MM/YYYY*/
    BytePushers.DateUtility.formatDateToString =  function (date) {
        var d = new Date(date),
            month = String((d.getMonth() + 1)),
            day = String(d.getDate()),
            year = d.getFullYear();

        if (month.length < 2) { month = '0' + month; }
        if (day.length < 2) { day = '0' + day; }

        return [month, day, year].join('/');
    };
}(window, document, BytePushers));
/*jslint unparam: false*/
