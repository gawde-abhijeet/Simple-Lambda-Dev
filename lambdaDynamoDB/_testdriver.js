/*
 * This is a utility file to help invoke and debug the lambda function. It is not included as part of the
 * bundle upload to Lambda.
 * 
 * Credentials:
 *  The AWS SDK for Node.js will look for credentials first in the AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY and then 
 *  fall back to the shared credentials file. For further information about credentials read the AWS SDK for Node.js documentation
 *  http://docs.aws.amazon.com/AWSJavaScriptSDK/guide/node-configuring.html#Credentials_from_the_Shared_Credentials_File_____aws_credentials_
 * 
 */

// No explicit Environment Variables for Access Keys
// Already provisioned the ~/.aws/credentials & ~/.aws/config
process.env['AWS_REGION'] = 'us-west-2';

// root folders for comments lambda functions & events json
var lambdaFuncComments = './lambda/comments/';
var eventJsonComments = './lambda/comments/events/';

var app = require('./app');

// Invoke create comments dynamoDB table
//app.invokeLambdaFunc(lambda_func_comments + 'dynamo-create-table', event_json_comments + 'create-table-Comments.json');

// Invoke create new item for comments dynamoDB table
//app.invokeLambdaFunc(lambda_func_comments + 'dynamo-create-item', event_json_comments + 'create-item-Comments.json');

// Invoke read all items for comments dynamoDB table
//app.invokeLambdaFunc(lambda_func_comments + 'dynamo-list-items', event_json_comments + 'list-all-items-Comments.json');

// Invoke read item by id for comments dynamoDB table
//app.invokeLambdaFunc(lambda_func_comments + 'dynamo-read-item', event_json_comments + 'read-by-id-Comments.json');

// Invoke update item by id for comments dynamoDB table
app.invokeLambdaFunc(lambdaFuncComments + 'dynamo-update-item', eventJsonComments + 'update-item-Comments.json');

// Invoke delete item by id for comments dynamoDB table
//app.invokeLambdaFunc(lambda_func_comments + 'dynamo-delete-item', event_json_comments + 'delete-item-Comments.json');