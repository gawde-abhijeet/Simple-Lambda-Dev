/*jshint -W101 */
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

var testHelper = require('./testHelper');

// Invoke create comments dynamoDB table
//console.log('------- Create Table named: comments (testdriver) -------');
//testHelper.invokeDynamoCreateTableComments();

// Invoke create new item for comments dynamoDB table
//console.log('------- Creating New Item -------');
//testHelper.invokeDynamoCreateItem();

// Invoke read all items for comments dynamoDB table
//console.log('------- Listing All Item (testdriver) -------');
//testHelper.invokeDynamoListItems();

// Invoke read item by id for comments dynamoDB table
//console.log('------- Read Item by Id -------');
//testHelper.invokeDynamoReadItemById();

// Invoke update item by id for comments dynamoDB table
//console.log('------- Update Item -------');
//testHelper.invokeDynamoUpdateItem();

// Invoke delete item by id for comments dynamoDB table
console.log('------- Delete Item -------');
testHelper.invokeDynamoDeleteItem();

testHelper.context.Promise
    .then(resp => { console.log('\r\n------- Called from testdriver ------- \r\nresp: ' + JSON.stringify(resp)); done(); })
    .catch(err => { done(); })