var fs = require('fs');
it('Asynchronous Test', function(done) {
    fs.readFile('some_file.txt', function(error, data) {
        if (error) {
            throw error;
        }
        done();
    });
});