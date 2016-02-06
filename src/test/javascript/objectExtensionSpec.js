describe("Object extension tests:", function() {

    describe('Object.isArray', function () {
        it('can tell an object is an array', function() {
            var result = Object.isArray([1, 3, 45, "d"]);

            expect(result).toBe(true);
        });

        it('can tell an object is not an array', function () {
            var obj = {};
            obj[0] = 1; obj[1] = 2; obj[2] = 3;

            var result = Object.isArray(obj);

            expect(result).toBe(false);
        });
    });

    describe('Object.isDate', function () {
        it('can tell an object is a date', function() {
            var result = Object.isDate(new Date());

            expect(result).toBe(true);
        });

        it('can tell an object is not a date', function () {
            var result = Object.isDate({});

            expect(result).toBe(false);
        });
    });

    describe('Object.isString', function () {
        it('can tell an object is a string', function() {
            var result = Object.isString("");

            expect(result).toBe(false);
        });

        it('can tell an object is not a string', function () {
            var result = Object.isString(1);

            expect(result).toBe(false);
        });
    });

    describe('Object.isNumeric', function () {
        it('can tell an object is numeric', function() {
            var result = Object.isNumeric(1);

            expect(result).toBe(true);
        });

        it('can tell an object is not numeric', function () {
            var result = Object.isNumeric("2");

            expect(result).toBe(false);
        });
    });

    describe('Object.isBoolean', function () {
        it('can tell an object is a boolean', function() {
            var result = Object.isBoolean(new Boolean("true"));

            expect(result).toBe(true);
        });

        it('can tell an object is not a boolean', function () {
            var result = Object.isBoolean("false");

            expect(result).toBe(false);
        });
    });

    describe('Object.isDefined', function () {
        it('can tell an object is defined', function() {
            var result = Object.isDefined(describe);

            expect(result).toBe(true);
        });

        it('can tell an object is not defined', function () {
            var result = Object.isDefined(undefined);

            expect(result).toBe(false);
        });
    });

    describe("Object.isRegEx", function() {
        it('can tell if a literal is regular expression or not', function(){
            var result = Object.isRegEx(/Hello World/g);

            expect(result).toBe(true);
        });
        it('can tell if an object is regular expression or not', function(){
            var result = Object.isRegEx(new RegExp("Hello World","g"));

            expect(result).toBe(true);
        });
        it('can tell if an object is not a regular expression', function(){
            var result = Object.isRegEx("Goat Cheese");

            expect(result).toBe(false);
        });
    });
    describe("Object.getProperty", function(){
        it('0 can tell if object gets property',function (){
            var person = {
                    firstName: "Tonte"
                },
                expectedResult = "Tonte";


            var actualResult = Object.getProperty(person, "firstName");

            expect(actualResult).toBe(expectedResult);
        });

        it('1 can tell if object gets property',function (){
            var person = {
                    getFirstName: function() {
                        return "Tonte";
                    }
                },
                expectedResult = "Tonte";


            var actualResult = Object.getProperty(person, "firstName");

            expect(actualResult).toBe(expectedResult);
        });

        //TODO: test super property.
    })

});