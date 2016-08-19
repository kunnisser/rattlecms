var mongoose=require("mongoose");
mongoose.connect("mongodb://rattleAdmin:adminAdmin@localhost/rattle");
var db=mongoose.connection;
db.on('error',function(){
	console.error('connect failed!');
});
db.once('open',function(){
	console.log("connect successed!");
});

var Schema=mongoose.Schema;

/*define accout schema*/
var _Accout=new Schema({
	username:String,
	password:String
});


/*export accout*/
exports.accout=mongoose.model("accout",_Accout);
