module.exports = function () {
    
    var lambdaCommentsRoot = './lambda/comments/';
    var eventsCommentsRoot = './lambda/comments/events/'

    var helpers = {
        
        /**
         * Lambda Func File Paths
         */

        lambdaCommentsCreateTable: lambdaCommentsRoot + 'dynamo-create-table',      
        lambdaCommentsCreateItem: lambdaCommentsRoot + 'dynamo-create-item',      
        lambdaCommentsListAllItem: lambdaCommentsRoot + 'dynamo-list-items',      
        lambdaCommentsUpdateItem: lambdaCommentsRoot + 'dynamo-update-item',      
        lambdaCommentsReadItem: lambdaCommentsRoot + 'dynamo-read-item',      
        lambdaCommentsDeleteItem: lambdaCommentsRoot + 'dynamo-delete-item',      
        
        /**
         * Event Payload File Paths
         */
        
        eventCommentsCreateTable: eventsCommentsRoot + 'create-table-Comments.json',      
        eventCommentsCreateItem: eventsCommentsRoot + 'create-item-Comments.json',
        eventCommentsListAllItem: eventsCommentsRoot + 'list-all-items-Comments.json',      
        eventCommentsUpdateItem: eventsCommentsRoot + 'update-item-Comments.json',      
        eventCommentsReadItem: eventsCommentsRoot + 'read-by-id-Comments.json',      
        eventCommentsDeleteItem: eventsCommentsRoot + 'delete-item-Comments.json'     
    };
    
    return helpers;
};