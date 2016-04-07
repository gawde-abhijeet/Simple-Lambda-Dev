/* global require, module */

var ApiBuilder = require("claudia-api-builder");

var api = new ApiBuilder(),
    Promise = require('bluebird'),
    AWS = require('aws-sdk'),
    DOC = require("dynamodb-doc"),
    dynamo = require('./dynamo-users'),
    userProfile = require('./userProfile');

// get all users
api.get('/users', function (request) {
    'use strict';
    
    return dynamo.listAllUsers(request.env.tableName);

});

// get user for {id}
api.get('/users/{id}', function (request) {
    'use strict';
    
    return dynamo.getUserById(request.pathParams.id, request.env.tableName);

});

// get user profile picture
api.get('/userProfilePicture', function (request) {
    'use strict';
    
    //return userProfile.getProfilePicture();
    return dynamo.getUserProfilePicture();

});


module.exports = api;