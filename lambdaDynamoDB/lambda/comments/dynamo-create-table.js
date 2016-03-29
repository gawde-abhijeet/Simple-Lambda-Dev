﻿//console.log('Loading Microservice Create Table...');

var AWS = require('aws-sdk');

exports.handler = function (event, context) {
    
    var dynamodb = new AWS.DynamoDB({ endpoint: new AWS.Endpoint('http://localhost:8003') });
    
    return dynamodb.createTable(event, function (err, data) {
        if (err) {
            //console.log(err); // an error occurred
            context.done(new Error('failed'));
        } else if (data) {
            //console.log(data);
            context.done(null, 'Succeeded');  // SUCCESS with message
        }
    });
};
