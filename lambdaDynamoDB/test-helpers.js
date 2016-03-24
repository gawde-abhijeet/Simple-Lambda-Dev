var context = require('aws-lambda-mock-context')();

exports.invokeLambdaFunc = function invokeLambdaFunc(lambdafunc, eventjson) {
    
    var fs = require('fs');
    var lambda = require(lambdafunc);
    var resp1 = null;
    

    // Load the event to be passed to Lambda what you want Lambda to process on.
    var event = JSON.parse(fs.readFileSync(eventjson, 'utf8').trim());
    
    var result =  lambda.handler(event, context);

    // Captures the response and/or errors
    context.Promise
        .then(function (value) { done(null, value); })
        .catch(function (err) { done(err); });

    return result;
};