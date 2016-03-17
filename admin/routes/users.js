var express=require("express");
var router=express.Router();
var models=require('../models/user');
var accout=models.accout;

function isLogined(req){
	return req.session.accout;
}

router.get("/login",function(req,res,next){
	console.log("flag="+isLogined(req));
	if(isLogined(req)){
		res.render("index",{
			baseUrl:"../",
			session:req.session.accout
		});
	}else{
		res.render("login",{
			baseUrl:"../",
			title:"CMS管理登录",
			username:"请输入用户名",
			password:"请输入密码",
			info1:"记住我",
			a1:"忘记密码?",
			info2:"进入"
		});
	}
});

router.post("/doLogin",function(req,res){
	accout.findOne({username:req.body.username,password:req.body.password},function(err,doc){
		if(doc){
			var user={
				username:req.body.username,
				password:req.body.password
			};
			console.log(user);
			req.session.accout=user;
			res.redirect("/");
		}else{
			return res.send("用户名或密码错误");
		}
	});
});

module.exports=router;
