define(['src/main/javascript/com.bytepushers.base.app'], function(BytePushers) {
    describe('bytepushers tests'), function() {
        it('should not be null', function() {
            expect(BytePushers).toBeDefined();
        });
        /*
        it("should recognize an aray", function(){
            var array = [1, 2, 3, 4];
            expect(BytePushers.isArrayLike(array)).toEqual(true);
        });*/
    }
});