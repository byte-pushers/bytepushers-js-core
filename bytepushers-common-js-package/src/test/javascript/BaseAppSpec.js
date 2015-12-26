describe("base.app tests", function(){ 
    it("should recognize an aray", function(){
        var array = [1, 2, 3, 4]; 
        expect(BytePushers.isArrayLike(array)).toEqual(true); 
    });
 });