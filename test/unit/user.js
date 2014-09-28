'use strict';

var expect    = require('chai').expect,
    User      = require('../../server/models/user'),
    dbConnect = require('../../server/lib/mongodb'),
    cp        = require('child_process'),
    Mongo     = require('mongodb'),
    db        = 'caps-test';

describe('User', function(){
  before(function(done){
    dbConnect(db, function(){
      done();
    });
  });

  beforeEach(function(done){
    cp.execFile(__dirname + '/../scripts/clean-db.sh', [db], {cwd:__dirname + '/../scripts'}, function(err, stdout, stderr){
      done();
    });
  });

  describe('constructor', function(){
    it('should create a new User object', function(){
      var o = {
        email : 'ed@aol.com',
        password : '1234',
        },
      u = new User(o);
      expect(u).to.be.instanceof(User);
    });
  });
  describe('.findById', function(id){
    it('should find a user by id', function(done){
      var _id = Mongo.ObjectID('000000000000000000000002');
      User.findById(_id, function(err, u){
        expect(u.email).to.equal('sue@aol.com');
        done();
      });
    });
  });
});//last
