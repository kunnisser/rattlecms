var express = require('express');
var router = express.Router();
var models=require('../models/user');
var accout=models.accout;
/* GET home page. */
router.get('/', function(req, res, next) {
	accout.findOne({username:"kunnisser"},function(err,doc){
		res.render('index', { title: 'rattleCms',h1:'cms',desc:doc });
	});
 
});

module.exports = router;
