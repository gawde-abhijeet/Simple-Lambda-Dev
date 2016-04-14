/* global require, module */

var ApiBuilder = require("claudia-api-builder");

var api = new ApiBuilder(),
    Promise = require('bluebird'),
    AWS = require('aws-sdk'),
    lambda = new AWS.Lambda(),
    DOC = require("dynamodb-doc"),
    dynamo = require('./dynamo-users'),
    lambdaHelper = require('./lambdaHelper');
//userProfile = require('./userProfile'),


// get all users
api.get('/users', function (request) {
    'use strict';
    
    var logData = {
        'correlationId': 'ajir-r2432-dd4j-5449', 
        'message': 'logging test message - listing all users'
    };
    
    lambdaHelper.invoke('LogMessage', logData);
    
    return dynamo.listAllUsers(request.env.tableName);

});

// get user for {id}
api.get('/users/{id}', function (request) {
    'use strict';
    
    return dynamo.getUserById(request.pathParams.id, request.env.tableName);

});

//// get user profile picture
//api.get('/userProfilePicture', function (request) {
//    'use strict';
    
//    //return userProfile.getProfilePicture();
//    return dynamo.getUserProfilePicture();

//});


module.exports = api;