
var context = require('aws-lambda-mock-context')();

var lambdaCommentsRoot = './lambda/comments/';
var eventsCommentsRoot = './lambda/comments/events/';

exports.invokeDynamoCreateTableComments = function () {
    
    invokeLambdaFunc(lambdaCommentsRoot + 'dynamo-create-table', eventsCommentsRoot + 'create-table-Comments.json');
};

exports.invokeDynamoCreateItem = function () {
    
    invokeLambdaFunc(lambdaCommentsRoot + 'dynamo-create-item', eventsCommentsRoot + 'create-item-Comments.json');
};

exports.invokeDynamoListItems = function () {
    
    invokeLambdaFunc(lambdaCommentsRoot + 'dynamo-list-items', eventsCommentsRoot + 'list-all-items-Comments.json');
};

exports.invokeDynamoReadItemById = function () {
    
    invokeLambdaFunc(lambdaCommentsRoot + 'dynamo-read-item', eventsCommentsRoot + 'read-by-id-Comments.json');
};

exports.invokeDynamoUpdateItem = function () {
    
    invokeLambdaFunc(lambdaCommentsRoot + 'dynamo-update-item', eventsCommentsRoot + 'update-item-Comments.json');
};

exports.invokeDynamoDeleteItem = function () {
    
    invokeLambdaFunc(lambdaCommentsRoot + 'dynamo-delete-item', eventsCommentsRoot + 'delete-item-Comments.json');
};

invokeLambdaFunc = function invokeLambdaFunc(lambdafunc, eventjson) {
    
    var fs = require('fs');
    var lambda = require(lambdafunc);
    
    // Load the event to be passed to Lambda what you want Lambda to process on.
    var event = JSON.parse(fs.readFileSync(eventjson, 'utf8').trim());
    
    lambda.handler(event, context);

};

exports.context = context;