exports.invokeLambdaFunc = function invokeLambdaFunc(lambdafunc, eventjson) {

    var fs = require('fs');
    var lambda = require(lambdafunc);
    
    // Load the event to be passed to Lambda what you want Lambda to process on.
    var event = JSON.parse(fs.readFileSync(eventjson, 'utf8').trim());
    
    var context = {};
    context.done = function () {
        console.log("------- Microservice Lambda Function Complete -------");
        console.log("Press CNTRL + C to exit...");
    }
    
    lambda.handler(event, context);
}