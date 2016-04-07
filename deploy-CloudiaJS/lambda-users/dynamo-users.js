
var Promise = require('bluebird'),
    AWS = require('aws-sdk'),
    DOC = require("dynamodb-doc");

var docClient = Promise.promisifyAll(new DOC.DynamoDB());

var httpntlm = require('httpntlm'),
    userName = 'ctc.appid',
    password = 'gW31eJ27oO64uH0Np',
    auth = 'Basic ' + new Buffer(userName + ':' + password).toString('base64'),
    requestUri = 'https://collabhub.accenture.com/People/ProfilePicture/marco.s.ilagan';

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

var getUserProfilePicture = function () {
    httpntlm.get({
        url: requestUri,
        username: userName,
        password: password,
        workstation: '',
        domain: ''
    }, function (err, res) {
        if (err) return err;
        
        return '{hurray!!}';
    });
}

function getTableName(tableName) {
    return tableName || "lambda-users";
};

module.exports.listAllUsers = dynamoListAllUsers;
module.exports.getUserById = dynamoUserById;
module.exports.getUserProfilePicture = getUserProfilePicture;