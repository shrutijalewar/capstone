'use strict';

process.env.DB   = 'caps-test';

var expect  = require('chai').expect,
    cp      = require('child_process'),
    app     = require('../../server/index'),
    cookie  = null,
    request = require('supertest');

describe('users', function(){
  before(function(done){
    request(app).get('/').end(done);
  });

  beforeEach(function(done){
    cp.execFile(__dirname + '/../scripts/clean-db.sh', [process.env.DB], {cwd:__dirname + '/../scripts'}, function(err, stdout, stderr){
      request(app)
      .post('/login')
      .send('email=bob@aol.com')
      .send('password=1234')
      .set('cookie', cookie)
      .end(function(err, res){
        cookie = res.headers['set-cookie'][0];
        done();
      });
    });
  });
  describe('post /login', function(){
    it('should allow a user to login', function(done){
      request(app)
      .post('/login')
      .send('email=bob@aol.com')
      .send('password=1234')
      .set('cookie', cookie)
      .end(function(err, res){
        expect(res.status).to.equal(200);
        done();
      });
    });
    it('should not allow a user to login with wrong credentials', function(done){
      request(app)
      .post('/login')
      .send('email=bob@aol.com')
      .send('password=abcd')
      .set('cookie', cookie)
      .end(function(err, res){
        expect(res.status).to.equal(401);
        done();
      });
    });
  });
  describe('post /register', function(){
    it('should allow a user to register', function(done){
      request(app)
      .post('/register')
      .send('email=jerry@aol.com')
      .send('password=1234')
      .set('cookie', cookie)
      .end(function(err, res){
        expect(res.status).to.equal(200);
        done();
      });
    });
    it('should not allow a user to register if already registered', function(done){
      request(app)
      .post('/register')
      .send('email=bob@aol.com')
      .send('password=1234')
      .set('cookie', cookie)
      .end(function(err, res){
        expect(res.status).to.equal(400);
        done();
      });
    });
    it('should not allow a user to register if password is too short', function(done){
      request(app)
      .post('/register')
      .send('email=sarah@aol.com')
      .send('password=12')
      .set('cookie', cookie)
      .end(function(err, res){
        expect(res.status).to.equal(400);
        done();
      });
    });
  });
  describe('get /home', function(){
    it('should take a user to the home page', function(done){
      request(app)
      .get('/home')
      .set('cookie', cookie)
      .end(function(req,res){
        expect(res.status).to.equal(200);
        //expect(res.text).to.include('Search');
        done();
      });
    });
  });
  describe('get /recipes', function(){
    it('should take a user to the recipes page', function(done){
      request(app)
      .get('/recipes')
      .set('cookie', cookie)
      .end(function(req,res){
        expect(res.status).to.equal(200);
        expect(res.text).to.include('this');
        expect(res.text).to.include('meat');
        done();
      });
    });
  });
  describe('get /recipe/b00000000000000000000001', function(){
    it('should take a user to a specific recipe page', function(done){
      request(app)
      .get('/recipe/b00000000000000000000001')
      .set('cookie', cookie)
      .end(function(req,res){
        expect(res.status).to.equal(200);
        expect(res.text).to.include('ingredients');
        expect(res.text).to.include('directions');
        done();
      });
    });
  });
  describe('get /links', function(){
    it('should take a user to the links page', function(done){
      request(app)
      .get('/links')
      .set('cookie', cookie)
      .end(function(req,res){
        expect(res.status).to.equal(200);
        expect(res.text).to.include('links');
        expect(res.text).to.include('momos');
        done();
      });
    });
  });
  describe('delete /logout', function(){
    it('should log a user out', function(done){
      request(app)
      .delete('/logout')
      .set('cookie', cookie)
      .end(function(err, res){
        expect(res.status).to.equal(200);
        done();
      });
    });
  });
  describe('confirm logout', function(){
    it('should confirm a user is logged out', function(done){
      request(app)
      .get('/links')
      .set('cookie')
      .end(function(req,res){
        expect(res.status).to.equal(401);
        expect(res.headers).to.have.property('x-authenticated-user', 'anonymous');
        done();
      });
    });
  });
});
