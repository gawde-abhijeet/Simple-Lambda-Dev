console.log('Loading Microservice Create Item...');

var AWS = require("aws-sdk");

exports.handler = function (event, context) {
    
    var dynamodb = new AWS.DynamoDB();
    
    //var params = {
    //    "TableName": "comments",
    //    "Item": {
    //        "pageId": { "S": "page00001" }
    //    }
    //};

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
