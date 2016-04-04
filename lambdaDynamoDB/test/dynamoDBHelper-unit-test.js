(function () {
    'use strict';
    var Promise = require('bluebird');
    var expect = require('chai').expect;
    var dynamoDBHelper = Promise.promisifyAll(require('../lambda/common/dynamoDBHelper')());

    describe("Unit testing the dynamoDBHelper", function () {
    
        before(function () {
            process.env['AWS_REGION'] = 'us-west-2';
        });

        describe("operation: PutItem of dynamoDB", function () {
            it("--> expect to create new item", function (done) { 
                var payload = {
                    'TableName': 'comments',
                    'Item': {
                        'pageId': { 'S': 'page00010' },
                        'userPosted': { 'S': 'user00010' },
                        'message': { 'S': 'message goes here...' }
                    }
                };

                dynamoDBHelper.createAsync(payload)
                .then(function (result) { 
                    console.log('The result:', result);
                })
                .catch(function (e) { 
                    console.log('Error:', e);
                });
            }); 
        });
    });
})();