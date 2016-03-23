(function () {
    'use strict';
    var expect = require('chai').expect;
    var testHelpers = require('./helpers/test-helpers-comments')();
    var lambdaComments = require(testHelpers.lambdaCommentsCreateItem);
    
    var context = require('aws-lambda-mock-context');
    var ctx = context();

    describe("Unit Testing: Lambda func for doing CRUD operation for dynamoDB table: comments", function () {
        describe("Create New Item", function () {
            var cresponse = null;
            var cerror = null;

            before(function (done) {
                lambdaComments.handler({
                    "TableName": "comments",
                    "Item": {
                        "pageId": { "S": "page00005" },
                        "userPosted": { "S": "user00003" },
                        "message": { "S": "message goes here..." }
                    }
                }, ctx);

                // Captures the response and/or errors
                ctx.Promise
                    .then(function (resp) { done(); })
                    .catch(function (err) { cerror = err; done(); })

            });
            
            it("not errored out!", function () {
                expect(cerror).to.be.null;
            });
        });
    });
})();