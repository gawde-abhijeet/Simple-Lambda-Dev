var AWS = require('aws-sdk'),
    lambda = new AWS.Lambda();

module.exports = {
    invoke: function (funcName, payload) {
        
        if (!funcName) {
            return new TypeError('Lambda function name is not provided.');
        }
        
        if (process.env['STAGE'] === 'dev') {
            var lambdaFunc = require(funcName);
            var context = require('aws-lambda-mock-context')();

            lambdaFunc.handler(payload, context);
        }
        else {
            var params = {
                'FunctionName': funcName,
                'Payload': JSON.stringify(payload)
            };
            
            lambda.invoke(params, function (err, data) {
                if (err) { return err; } else { return data; }
            });
        }
    }
};