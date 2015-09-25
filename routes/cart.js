
    
module.exports = function ( app ) {
    //查看购物车商品
    app.get('/cart', function(req, res) {
        var Cart = global.dbHelper.getModel('cart');
        if(!req.session.user){
            req.session.error = "用户已过期，请重新登录:";
            res.redirect('/login');
        }else{
            Cart.find({"uId":req.session.user._id}, function (error, docs) {
                res.render('cart',{carts:docs});
            });
        }
    });


    //添加购物车商品
    app.post('/cart',function(req,res){
        var Cart = global.dbHelper.getModel('cart');
        if(!req.session.user){
            req.session.error = "用户已过期，请重新登录:";
            res.redirect('/login');
        }else{
            var Commodity = global.dbHelper.getModel('commodity'),
                Cart = global.dbHelper.getModel('cart');
            Cart.findOne({"uId":req.session.user._id, "cId":req.body.cId},function(error,doc){
                //商品已存在 +1
                if(doc){
                    Cart.update({"uId":req.session.user._id, "cId":req.body.cId},{$set : { cQuantity : doc.cQuantity + 1 }},function(error,doc){
                        //成功返回1  失败返回0
                        if(doc > 0){
                            res.redirect('/home');
                        }
                    });
                //商品未存在，添加
                }else{
                     Cart.create({
                            uId: req.session.user._id,
                            cId: req.body.cId,
                            cName:req.body.cName,
                            cPrice: req.body.cPrice,
                            cImgSrc: req.body.cImgSrc,
                            cQuantity : 1
                        },function(error,doc){
                            if(doc){
                                console.log(doc.cId);
                                res.send(200);
                            }
                        });
                }
            });
        }
    });
    
    
    //删除购物车商品
    app.get("/delFromCart/:id", function(req, res) {
        //req.params.id 获取商品ID号
        var Cart = global.dbHelper.getModel('cart');
        Cart.remove({"_id":req.params.id},function(error,doc){
            //成功返回1  失败返回0
            if(doc > 0){
                res.redirect('/cart');
            }
        });
    });

    //购物车结算
    app.post("/cart/clearing",function(req,res){
        var Cart = global.dbHelper.getModel('cart');
        Cart.update({"_id":req.body.id},{$set : { cQuantity : req.body.cnum,cStatus:true }},function(error,doc){
            //更新成功返回1  失败返回0
            if(doc > 0){
                res.send(200);
            }
        });
    });


}

