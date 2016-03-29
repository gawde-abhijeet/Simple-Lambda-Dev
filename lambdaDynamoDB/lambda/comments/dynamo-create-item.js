
var AWS = require('aws-sdk');

exports.handler = function (event, context) {
    
    // Endpoint specified for working with the local DynamoDB
    var dynamodb = new AWS.DynamoDB({ endpoint: new AWS.Endpoint('http://localhost:8003') });
    
    return dynamodb.putItem(event, function (err, data) {
        if (err) {
            //console.log(err); // an error occurred
            context.done(new Error('failed'));
        } else if (data) {
            //console.log('\r\n------- Called from lambda func ------- \r\ndata: ' + JSON.stringify(data));
            context.succeed('success');  // SUCCESS with message
        }
    });
};
