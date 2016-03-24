// module dependencies
var context = require('aws-lambda-mock-context');
var index = require('../lambda/greetings/hello-world');

// Start the test
describe('Lambda Test', function () {
    
    it('Should call the succeed method', function (done) {
        var ctx = context();        
        
        index.handler({ hello: 'world' }, ctx);
        
        ctx.Promise
            .then(function () {
            // succeed() called
            done();
        })
            .catch(function (err) {
            // fail() called
            done(err);
        });
    });
    
    //it('Should call the fail method', function (done) {
    //    index.handler({ hello: 'wrld' }, context(function (err, result) {
    //        if (err) {
    //            // If we have an error, it's fine
    //            done();
    //        }
    //        else {
    //            // If we don't have an error, it means the fail() method was not called
    //            done(new Error('Fail not called'));
    //        }
    //    }));
    //});
});