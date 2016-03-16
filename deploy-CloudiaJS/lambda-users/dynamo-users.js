
var Promise = require('bluebird'),
    AWS = require('aws-sdk'),
    DOC = require("dynamodb-doc");

var docClient = Promise.promisifyAll(new DOC.DynamoDB())

var dynamoListAllUsers = function (reqTableName) {
    
    // Set up event for dynamo
    var params = {
        TableName: getTableName(reqTableName)
    };

    return docClient.scanAsync(params);
} 

var dynamoUserById = function (reqUserId, reqTableName) {
    
    // Set up event for dynamo
    var params = {
        TableName: getTableName(reqTableName),
        Key: {
            userId: reqUserId
        }
    };
    
    return docClient.getItemAsync(params);
}


function getTableName(tableName) {
    return tableName || "lambda-users";
};

module.exports.listAllUsers = dynamoListAllUsers;
module.exports.getUserById = dynamoUserById;