'use strict';

var Mongo  = require('mongodb');

function Recipe(o){
  strip(o);
  this._id = Mongo.ObjectID();
  this.name  = o.name;
  this.course = o.course;
  this.foodGroup = o.foodGroup;
  this.serves = o.serves * 1;
  this.cal = o.cal * 1;
  this.photo = o.photo || 'http://2.bp.blogspot.com/-4VHY9jyxKps/VCQsbR2S8uI/AAAAAAAACWA/lHvBMMsB5mY/s1600/food%2Bprep.jpg';
  this.ingredients = o.ingredients.split(',').map(function(i){return i.trim();});
  this.directions = o.directions;
  this.hr = o.hr * 1;
  this.min = o.min * 1;
  this.toBurn = o.cal * 1/ o.serves *1;
  this.created = new Date();
}

Object.defineProperty(Recipe, 'collection', {
  get: function(){return global.mongodb.collection('recipes');}
});

Recipe.create = function(o, cb){
  var r = new Recipe(o);
  Recipe.collection.save(r,cb);
};

Recipe.all = function(cb){
  Recipe.collection.find().toArray(cb);
};

Recipe.findById = function(id, cb){
  var _id = Mongo.ObjectID(id);
  Recipe.collection.findOne({_id:_id}, cb);
};


module.exports = Recipe;
function strip(o){
var properties = Object.keys(o);
  properties.forEach(function(property){
    if(typeof o[property] === 'string'){
      o[property] = o[property].trim();
    }
  });
}
