var express = require('express');
var router = express.Router();
var unirest = require('unirest');
var passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;


var AV = require('leancloud-storage');
var APP_ID = 'iqnghLfOqAtee5Bo1QAgsAC3-gzGzoHsz';
var APP_KEY = 'KqPheplNC2ctxTW4XJlaXoeJ';

AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});

//router.get('/', function (req, res, next) {
//  res.send('respond with a resource');
//});
module.exports = router;
