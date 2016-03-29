(function () {
    'use strict';
    var expect = require('chai').expect;
    var sinon = require('sinon');
    
    describe('unit test bootstrap', function () {
        it('chai should works', function () {
            expect('a').to.equal('a');
        });
        
        it('sinon should works', function () {
            
            function Obj() { }
            Obj.prototype.method = function () {
                return ('I am Obj#method()');
            }
            
            sinon.stub(Obj.prototype, 'method', function () {
                return ('I am Sinon stub!');
            });
            
            var obj = new Obj();
            expect(obj.method()).to.equal('I am Sinon stub!');
            
            Obj.prototype.method.restore();
            expect(obj.method()).to.equal('I am Obj#method()');
        });
    });
})();
