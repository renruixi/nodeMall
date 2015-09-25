module.exports = function ( app ) {
    app.get('/register', function(req, res) {
        res.render('register');
    });

    app.post('/register', function (req, res) {

        var userModel=req.body;

        if(userModel.upwd != userModel.upwd_re){
            res.send("两次输入密码不匹配！！");
            return res.redirect('/register');
        }

        checkID(userModel);

        function checkID(user){
            switch(user.info){
                case "1":
                    var Company=global.dbHelper.getModel("company");
                    checkRegister(Company,userModel);
                    break;
                case "0":
                    var User=global.dbHelper.getModel("user");
                    checkRegister(User,userModel);
                    break;
            };
        }

        function checkRegister(person,user){
            person.findOne({name: user.uname}, function (error, doc) {
                if (error) {
                    res.send(500);
                    req.session.error = '网络异常错误！';
                    console.log(error);
                } else if (doc) {
                    req.session.error = '用户名已存在！';
                    res.send(500);
                } else {
                    if(user.info == 1){
                        person.create({
                            name: user.uname,
                            password: user.upwd,
                            companyname:user.companyname,
                            info:user.info
                        },function (error, doc) {
                            if (error) {
                                res.send(500);
                                console.log(error);
                            } else {
                                req.session.error = '用户名创建成功！';
                                res.send(200);
                            }
                        });
                    }else{
                        person.create({
                            name: user.uname,
                            password: user.upwd,
                            info:user.info
                        }, function (error, doc) {
                            if (error) {
                                res.send(500);
                                console.log(error);
                            } else {
                                req.session.error = '用户名创建成功！';
                                res.send(200);
                            }
                        });
                    }
                }
            });
        }
        
    });
}