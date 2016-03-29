var AWS = require('aws-sdk');
var S3rver = require('s3rver');
var async = require('async');
var should = require('chai').should();
var fs = require('fs-extra');
var _ = require('lodash');
var moment = require('moment');
var util = require('util');
var path = require('path');
var md5 = require('md5');

describe('S3rver Unit Tests (Fake S3)', function () {
    var s3Client;
    var buckets = ['bucket1', 'bucket2', 'bucket3', 'bucket4', 'bucket5', 'bucket6'];
    var s3rver;
    
    before(function (done) {
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
    });

    after(function (done) {
        s3rver.close(done);
    });
    
    describe('Supported Methods for Bucket', function () {
        it('should fetch already provisioned six buckets', function (done) {
            s3Client.listBuckets(function (err, buckets) {
                if (err) {
                    return done(err);
                }
                buckets.Buckets.length.should.equal(6);
                _.forEach(buckets.Buckets, function (bucket) {
                    should.exist(bucket.Name);
                    moment(bucket.CreationDate).isValid().should.equal(true);
                });
                done();
            });
        });
        
        it('should create new bucket: bucket7 ', function (done) {
            s3Client.createBucket({ Bucket: 'bucket7' }, function (err) {
                if (err) {
                    return done(err);
                }
                done();
            });
        });
        
        it('should delete a bucket: bucket1', function (done) {
            s3Client.deleteBucket({ Bucket: buckets[0] }, function (err) {
                if (err) {
                    return done(err);
                }
                return done();
            });
        });
        
    });    
    
    describe('Supported Methods for Objects', function () {
        it('should store an image in a bucket: bucket7', function (done) {
            var file = path.join(__dirname, 'resources/image.jpg');
            fs.readFile(file, function (err, data) {
                if (err) {
                    return done(err);
                }
                var params = {
                    Bucket: 'bucket7',
                    Key: 'image',
                    Body: new Buffer(data),
                    ContentType: 'image/jpeg',
                    ContentLength: data.length
                };
                s3Client.putObject(params, function (err, data) {
                    /"[a-fA-F0-9]{32}"/.test(data.ETag).should.equal(true);
                    if (err) {
                        return done(err);
                    }
                    done();
                });
            });
        });
        
        it('should store a gzip encoded file in bucket: bucket7', function (done) {
            var file = path.join(__dirname, 'resources/jquery.js.gz');
            var stats = fs.statSync(file);
            
            var params = {
                Bucket: 'bucket7',
                Key: 'jquery',
                Body: fs.createReadStream(file), // new Buffer(data),
                ContentType: 'application/javascript',
                ContentEncoding: 'gzip',
                ContentLength: stats.size
            };
            
            s3Client.putObject(params, function (err, data) {
                if (err) return done(err);
                
                s3Client.getObject({ Bucket: 'bucket7', Key: 'jquery' }, function (err, object) {
                    if (err) {
                        return done(err);
                    }
                    object.ContentLength.should.equal(stats.size.toString());
                    object.ContentEncoding.should.equal('gzip');
                    object.ContentType.should.equal('application/javascript');
                    done();
                });
            });
        });
        
        it('should delete objects in bucket: bucket7 with key:jquery', function (done) {
            var testObjects = [];
            
            testObjects.push({ Bucket: 'bucket7', Key: 'jquery' });
            
            s3Client.deleteObject(testObjects[0], function (err) {
                if (err) {
                    return done(err);
                }
                return done();
            });
        });
        
        it('should get image metadata from a bucket using HEAD method', function (done) {
            var file = path.join(__dirname, 'resources/image.jpg');
            fs.readFile(file, function (err, data) {
                s3Client.headObject({ Bucket: 'bucket7', Key: 'image' }, function (err, object) {
                    if (err) {
                        return done(err);
                    }
                    object.ETag.should.equal('"' + md5(data) + '"');
                    object.ContentLength.should.equal(data.length.toString());
                    object.ContentType.should.equal('image/jpeg');
                    done();
                });
            });
        });

        it('should get an objects acl from a bucket: bucket7', function (done) {
            s3Client.getObjectAcl({ Bucket: 'bucket7', Key: 'image' }, function (err, object) {
                if (err) {
                    return done(err);
                }
                object.Owner.DisplayName.should.equal('S3rver');
                done();
            });
        });

        it('should copy an image object into another bucket', function (done) {
            var params = {
                Bucket: buckets[3],
                Key: 'image/jamie',
                CopySource: '/bucket7/image'
            };
            s3Client.copyObject(params, function (err, data) {
                if (err) {
                    return done(err);
                }
                /"[a-fA-F0-9]{32}"/.test(data.ETag).should.equal(true);
                done();
            });
        });
    });

});