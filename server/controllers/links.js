'use strict';

var Link = require('../models/link');

exports.create = function(req, res){
  Link.create(req.body, req.user, function(err, link){
    res.send({link:link});
  });
};

exports.index = function(req, res){
  Link.all(req.user, function(err, links){
    res.send({links:links});
  });
};
