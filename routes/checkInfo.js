module.exports={
	checkInfo:function(req,res,next){
		var userModel=req.body;
		if(userModel.info == "1"){
			next();
		}else{
			req.session.error="您不是企业账户，请注册企业账户，享受服务！";
			res.send(404);
			res.redirect("back");
		}
	}
};