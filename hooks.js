describe('Suite', function() {
    before(function() {
        console.log('before()');
    });
    beforeEach(function() {
        console.log('beforeEach()');
    });
    afterEach(function() {
        console.log('afterEach()');
    });
    after(function() {
        console.log('after()');
    });
    it('Test 1', function() {
        console.log('Test 1');
    });
    it('Test 2', function() {
        console.log('Test 2');
    });
});