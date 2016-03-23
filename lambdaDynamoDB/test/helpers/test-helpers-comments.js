module.exports = function () {
    
    var lambdaCommentsRoot = '../lambda/comments/';
    var eventsCommentsRoot = '../lambda/comments/events/'

    var helpers = {
        
        /**
         * Lambda Func File Paths
         */

        lambdaCommentsCreateItem: lambdaCommentsRoot + 'dynamo-create-item',        
        
        /**
         * Event Payload File Paths
         */

        eventCommentsCreateItem: eventsCommentsRoot + 'create-item-Comments.json'
    };
    
    return helpers;
    
};