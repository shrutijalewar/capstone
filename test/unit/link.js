'use strict';

var expect    = require('chai').expect,
    Link      = require('../../server/models/link'),
    dbConnect = require('../../server/lib/mongodb'),
    cp        = require('child_process'),
    Mongo     = require('mongodb'),
    db        = 'caps-test';

describe('Link', function(){
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
    it('should create a new Link object', function(){
      var o = {
        name : 'saag',
        url : 'http://saag.com',
        course: 'side',
        },
        user= Mongo.ObjectID('000000000000000000000002'),
        l = new Link(o, user);
      expect(l).to.be.instanceof(Link);
    });
  });
  describe('.all', function(){
    it('should find all links of a userId', function(done){
      var user={
        "_id" : Mongo.ObjectID('000000000000000000000001')
        };
      Link.all(user, function(err, l){
        console.log ('>>>>>>>>>', l);
        expect(l.length).to.equal(2);
        done();
      });
    });
  });
});//last
