console.log('Loading Microservice List Items v1...');

var AWS = require('aws-sdk');

exports.handler = function (event, context) {
    
    var dynamodb = new AWS.DynamoDB({ endpoint: new AWS.Endpoint('http://localhost:8003') });
        
    return dynamodb.scan(event, function (err, data) {
        if (err) {
            console.log(err); // an error occurred
            context.done(new Error('failed'), null);
        } else if (data) {
            console.log('data: ' + JSON.stringify(data));
            context.done(null, data);  // SUCCESS with results
        }
    });
};
