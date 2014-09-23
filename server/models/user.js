'use strict';

var bcrypt = require('bcrypt'),
    Mongo  = require('mongodb');

function User(){
}

Object.defineProperty(User, 'collection', {
  get: function(){return global.mongodb.collection('users');}
});

User.findById = function(id, cb){
  var _id = Mongo.ObjectID(id);
  User.collection.findOne({_id:_id}, cb);
};

User.register = function(o, cb){
  User.collection.findOne({email:o.email}, function(err, user){
    if(user || o.password.length < 3){return cb();}
    o.password = bcrypt.hashSync(o.password, 10);
    User.collection.save(o, cb);
  });
};

User.login = function(o, cb){
  User.collection.findOne({email:o.email}, function(err, user){
    if(!user){return cb();}
    var isOk = bcrypt.compareSync(o.password, user.password);
    if(!isOk){return cb();}
    cb(null, user);
  });
};

User.prototype.update = function(o, cb){
  o.weightKG = (parseInt(o.weight)*0.45);
  o.heightCM = (parseInt(o.ft)*12+parseInt(o.inches))*2.54;
  if(o.gender !== 'male'){
    o.calorieBase=(10*o.weightKG)+(6.25*o.heightCM)-(5*o.age)-161;
    }else if(o.gender === 'male'){
    o.calorieBase=(10*o.weightKG)+(6.25*o.heightCM)-(5*o.age)+5;
    }
  User.collection.save(this, function(){
    cb(null, o);
  });
};
module.exports = User;

