var aws = require('aws-sdk');
var lambda = new aws.Lambda({
    region: 'us-west-2' //change to your region
});

lambda.invoke({
    FunctionName: 'dynamo-update-item',
    Payload: JSON.stringify(event, null, 2) // pass params
}, function (error, data) {
    if (error) {
        context.done('error', error);
    }
    if (data.Payload) {
        context.succeed(data.Payload)
    }
});