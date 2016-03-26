//console.log('Loading Microservice List Items v1...');

var AWS = require('aws-sdk');

exports.handler = function (event, context) {
    
    var dynamodb = new AWS.DynamoDB({ endpoint: new AWS.Endpoint('http://localhost:8003') });
        
    dynamodb.scan(event, function (err, data) {
        if (err) {
            console.log(err); // an error occurred
            context.done(new Error('failed'), null);
        } else if (data) {
            console.log('\r\n------- Called from lambda func ------- \r\ndata: ' + JSON.stringify(data));
            context.succeed(data);  // SUCCESS with results
        }
    });
};
