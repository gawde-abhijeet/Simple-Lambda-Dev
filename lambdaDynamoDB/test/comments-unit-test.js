(function () {
    'use strict';
    var expect = require('chai').expect;
    var testHelpers = require('../test-helpers');
    var testHelpersConfig = require('../test-helpers-config')();
    
    describe("Unit Testing: Lambda func for doing CRUD operation for dynamoDB table 'comments'", function () {
        describe("Operation: Create New Item", function () {
            var result = null;

            beforeEach(function (done) {
                process.env['AWS_REGION'] = 'us-west-2';

                result = testHelpers.invokeLambdaFunc(testHelpersConfig.lambdaCommentsCreateItem, testHelpersConfig.eventCommentsCreateItem);
                done();
            });
            
            it("--> was able to successfully create new item", function (done) {
                expect(result).to.not.be.an('undefined');
                done();
            });
        });

        //describe("Operation: Read Item by Id", function () {
        //    var result = null;
            
        //    beforeEach(function (done) {
        //        process.env['AWS_REGION'] = 'us-west-2';
                
        //        //result = testHelpers.invokeLambdaFunc(testHelpersConfig.lambdaCommentsReadItem, testHelpersConfig.eventCommentsReadItem);
        //        done();
        //    });
            
        //    it("--> was able to successfully read item by Id", function (done) {
        //        //expect(result).to.be.an('undefined');
        //        done();
        //    });
        //});
    });
})();