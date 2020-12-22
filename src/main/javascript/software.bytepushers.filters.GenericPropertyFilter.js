/*global BytePushers, console*/
(function (BytePushers) {
    'use strict';
    BytePushers = BytePushers || {};
    BytePushers.filters = BytePushers.namespace("software.bytepushers.filters");
    BytePushers.filters.GenericProptertyFilter = BytePushers.namespace("software.bytepushers.filters.GenericProptertyFilter");

    BytePushers.filters.GenericProptertyFilter.DatePropteryFilter = function (values, date, propertyName) {
        var filteredDates = [];

        if (!Object.isArray(values)) {
            return;
        }

        values.forEach(function (value) {
            if (value[propertyName].valueOf() === date.valueOf()) {
                filteredDates.push(value);
            }
        });

        return filteredDates;
    };

    BytePushers.filters.GenericProptertyFilter.StringPropteryFilter = function (values, searchText, propertyName) {
        var filtered = [];

        if (!Object.isArray(values)) {
            return;
        }
        searchText = searchText.toLowerCase();

        values.forEach(function (value) {
            if (value[propertyName].toLowerCase().indexOf(searchText) >= 0) {
                filtered.push(value);
            }
        });

        return filtered;
    };
}(BytePushers));
