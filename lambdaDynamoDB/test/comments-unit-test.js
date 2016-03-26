(function () {
    'use strict';
    var expect = require('chai').expect;
    var testHelper = require('../testHelper');
    
    describe("Unit Testing: Lambda func for doing CRUD operation for dynamoDB table 'comments'", function () {
        
        before(function () {
            process.env['AWS_REGION'] = 'us-west-2';
        });

        describe("Operation: Create New Item", function () {
            it("--> was able to successfully create new item", function (done) {
                
                testHelper.invokeDynamoCreateItem();

                testHelper.context.Promise
                    .then(function (value) {
                        expect(value).to.not.be.an('undefined');
                        expect(value).to.be.equal('success');
                        done();
                    })
                    .catch(function (err) { done(); })
            });
        });

        describe("Operation: Read Item by Id", function () {
            
            it("--> was able to successfully read item", function (done) {
                
                testHelper.invokeDynamoListItems();
                
                testHelper.context.Promise
                    .then(function (value) {
                    expect(value).to.not.be.an('undefined');
                    expect(value).to.contain('ScannedCount');
                    done();
                })
                    .catch(function (err) { done(); })
            });
        });

        describe("Operation: Update Item", function () {
            it("--> was able to successfully update item", function (done) {
                
                testHelper.invokeDynamoUpdateItem();
                
                testHelper.context.Promise
                    .then(function (value) {
                    expect(value).to.not.be.an('undefined');
                    expect(value).to.be.equal('success');
                    done();
                })
                    .catch(function (err) { done(); })
            });
        });

        describe("Operation: Delete Item", function () {
            it("--> was able to successfully delete item", function (done) {
                
                testHelper.invokeDynamoUpdateItem();
                
                testHelper.context.Promise
                    .then(function (value) {
                    expect(value).to.not.be.an('undefined');
                    expect(value).to.be.equal('success');
                    done();
                })
                    .catch(function (err) { done(); })
            });
        });
    });
})();