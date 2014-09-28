'use strict';

var expect    = require('chai').expect,
    Recipe      = require('../../server/models/recipe'),
    dbConnect = require('../../server/lib/mongodb'),
    cp        = require('child_process'),
    Mongo     = require('mongodb'),
    db        = 'caps-test';

describe('Recipe', function(){
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

  describe('.create', function(){
    it('should create a new Recipe object', function(){
      var o = {
        name : 'saag',
        course : 'side',
        cal : 200,
        serves: 1,
        foodGroup: 'vegetables',
        ingredients: 'a, b,c'
        },
        user = Mongo.ObjectID('000000000000000000000001'),
      r = new Recipe(o, user);
      expect(r).to.be.instanceof(Recipe);
    });
  });
  describe('.findById', function(){
    it('should find a recipe by id', function(done){
      var _id = Mongo.ObjectID('b00000000000000000000001');
      Recipe.findById(_id, function(err, r){
        expect(r.name).to.equal('this');
        done();
      });
    });
  });
  describe('.all', function(){
    it('should find all recipes of a userId', function(done){
      var user={
        "_id" : Mongo.ObjectID('000000000000000000000001')
        };
      Recipe.all(user, function(err, r){
        expect(r.length).to.equal(1);
        done();
      });
    });
  });
});//last
