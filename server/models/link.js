'use strict';

var Mongo  = require('mongodb');

function Link(o, user){
  this._id = Mongo.ObjectID();
  this.name  = o.name;
  this.url  = o.url;
  this.course = o.course;
  this.date = new Date();
  this.userId  = user._id;
}

Object.defineProperty(Link, 'collection', {
  get: function(){return global.mongodb.collection('links');}
});

Link.create = function(o, user, cb){
  var l = new Link (o, user);
  Link.collection.save(l, cb);
};

Link.all = function(user, cb){
  Link.collection.find({userId:user._id}).toArray(cb);
};

module.exports = Link;

