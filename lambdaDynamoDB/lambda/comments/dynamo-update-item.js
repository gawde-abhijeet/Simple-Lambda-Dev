//console.log('Loading Microservice Update Item...');

var AWS = require('aws-sdk');

exports.handler = function (event, context) {
    
    var dynamodb = new AWS.DynamoDB({ endpoint: new AWS.Endpoint('http://localhost:8003') });
    
    return dynamodb.updateItem(event, function (err, data) {
        if (err) {
            //console.log(err); // an error occurred
            context.done(new Error('failed'));
        } else if (data) {
            //console.log(data);
            context.done(null, 'success');  // SUCCESS with message
        }
    });
};
