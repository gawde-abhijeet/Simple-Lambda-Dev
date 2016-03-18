console.log('Loading Microservice Create Item...');

var AWS = require("aws-sdk");

exports.handler = function (event, context) {
    
    // Endpoint specified for working with the local DynamoDB
    var dynamodb = new AWS.DynamoDB({ endpoint: new AWS.Endpoint('http://localhost:8003') });
    
    dynamodb.putItem(event, function (err, data) {
        if (err) {
            console.log(err); // an error occurred
            context.fail(new Error('failed'));
        } else if (data) {
            console.log(data);
            context.done(null, 'Succeeded');  // SUCCESS with message
        }
    });
};
