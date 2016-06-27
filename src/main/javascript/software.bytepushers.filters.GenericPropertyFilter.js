/*global BytePushers, console*/
/*jslint unparam: true*/
(function (BytePushers) {
    'use strict';
    BytePushers = BytePushers || {};
    BytePushers.filters = BytePushers.namespace("software.bytepushers.filters");
    BytePushers.filters.GenericProptertyFilter = BytePushers.namespace("software.bytepushers.filters.GenericProptertyFilter");

    BytePushers.filters.GenericProptertyFilter.DatePropteryFilter = function (values, date, propertyName) {
        if (!Object.isArray(values)) { return; }
        var filteredDates = [];

        values.forEach(function (value, index, values) {
            if (value[propertyName].valueOf() === date.valueOf()) {
                filteredDates.push(value);
            }
        });

        return filteredDates;
    };

    BytePushers.filters.GenericProptertyFilter.StringPropteryFilter = function (values, searchText, propertyName) {
        if (!Object.isArray(values)) { return; }
        var filtered = [];
        searchText = searchText.toLowerCase();

        values.forEach(function (value, index, values) {
            if (value[propertyName].toLowerCase().indexOf(searchText) >= 0) { filtered.push(value); }
        });

        return filtered;
    };
}(BytePushers));
/*jslint unparam: false*/
