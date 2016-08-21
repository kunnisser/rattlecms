var express=require("express");
var router=express.Router();
var models=require('../models/user');
var accout=models.accout;

function isLogined(req){
	return req.session.accout;
}

/*注册路由*/
router.get("/register",function(req,res,next){
	res.render("register",{
		baseUrl:"../",
		title:"申请注册管理账号"
	});
});

/*登录路由*/
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
			title:"微服私仿CMS",
			username:"请输入用户名",
			password:"请输入密码",
			register:"申请注册",
			a1:"忘记密码?",
			sub:"进入"
		});
	}
});


/*登录账号*/
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





/*注销登录账号*/
router.get("/loginout",function(req,res){

	if(isLogined(req)){
		req.session.destroy();
		res.redirect("/users/login");
	}else{
		res.redirect("/");
	}
});

/*注册账号*/
router.post("/doReg",function(req,res){
	console.log(req.body.username);
	console.log(req.body.avator);
	res.json({'flag':'true'});
});

module.exports=router;
