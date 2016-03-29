var S3rver = require('s3rver');

var s3rver;
var s3Client;

module.exports.start = function startFakeS3() {
    s3rver = new S3rver({
        port: 4569,
        hostname: 'localhost',
        silent: true,
        indexDocument: '',
        errorDocument: '',
        directory: '/tmp/s3rver_test_directory'
    }).run(function (err, hostname, port, directory) {
        if (err) {
            return done('Error starting server', err);
        }
        
        var config = {
            accessKeyId: 'unknown',
            secretAccessKey: 'unknown',
            endpoint: util.format('%s:%d', hostname, port),
            sslEnabled: false,
            s3ForcePathStyle: true
        };
        
        AWS.config.update(config);
        
        s3Client = new AWS.S3();
        s3Client.endpoint = new AWS.Endpoint(config.endpoint);
        
        /**
         * Remove if exists and recreate the temporary directory
         */
        fs.remove(directory, function (err) {
            if (err) {
                return done(err);
            }
            fs.mkdirs(directory, function (err) {
                if (err) {
                    return done(err);
                }
                
                // Create 6 buckets
                async.eachSeries(buckets, function (bucket, callback) {
                    s3Client.createBucket({ Bucket: bucket }, callback);
                }, done);
            });
        });
    });
};

module.exports.stop = function stopFakeS3() {
    s3rver.close(done);
};