var express=require("express");
var router=express.Router();

router.get("/",function(req,res,next){
	res.render("login",{
		title:"CMS管理登录",
		username:"请输入用户名",
		password:"请输入密码",
		info1:"记住我",
		a1:"忘记密码?",
		info2:"进入"
	});
});

router.post("/",function(req,res){
	res.send("username="+req.body.username+"<br/>"+"password"+req.body.password);
});

module.exports=router;
