'use strict';

var Recipe = require('../models/recipe');

exports.create = function(req, res){
  Recipe.create(req.body, req.user, function(err, recipe){
    res.send({recipe:recipe});
  });
};

exports.index = function(req, res){
  Recipe.all(req.user, function(err, recipes){
    res.send({recipes:recipes});
  });
};

exports.show = function(req, res){
  Recipe.findById(req.params.recipeId, function(err, recipe){
    res.send({recipe:recipe});
  });
};
