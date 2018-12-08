/**
 * ProductController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
var chainService=require('../services/chainservice');
module.exports = {
    /**
     * 项目列表
     */
    productList:async function(req,res){
        var product=await Product.find({is_online:1});
        return res.json({
            code:1,
            product:product
        });


    },

    /**
     * 
     * 项目详情 
     * 
     */
    productDetail:async function(req,res){
        var id=req.body.id;
        var product=await Product.findOne({id:id});
        return res.json({
            code:1,
            product:product
        });

    },


    /**
     * 
     * 项目捐献
     */
    trade:async function(req,res){
        var user = req.session.user;
        var id=req.body.id;
        var num=req.body.num;
        if(!user){
            return res.json({
                code:0,
                msg:'你还没有登录',
              });
        }

        //获取项目信息
        var product =await Product.findOne({id:id});
        //购买的票数
        var ticket=product.num/num;
        //生成单号
        
        
        //获取用户地址和私钥
        var userCurrency=await Usercurrency.findOne({user_id:user.id});
        var gasPrice=chainService.gasPrice();
        
        var account = {address:userCurrency.address,secret:userCurrency.secret};

        //平台账号地址
        var toAddress = "0xdaf0abc73c99ab6bc49ed52610bc8923eaf6609e";
        var amount = num;

        var hash = chainService.send(account.address, account.secret, toAddress, amount, txCount = -1,gasPrice.gasPrice);
        if(hash){
            //添加交易记录
            var timestamp = (new Date()).getTime();
            var trade=await Trade.findOrCreate({user_id:user.id,num:num,gas:gasPrice,hash:hash,create_time:timestamp,status:1});
            //添加订单
            var rnd="";
            for(var i=0;i<10;i++){
                rnd+=Math.floor(Math.random()*10);
            }
            
            for(var i=0;i<=ticket;i++){
                await Order.create({user_id:user.id,product_id:product.id,trade_id:trade.id,create_time:timestamp,order_no:timestamp+rnd});
            }

            return res.json({
                code:1,
                msg:"支持成功"
                 
             });

        }else{
            return res.json({
                code:0,
                msg:"支持失败"
                 
             });

        }

    }




  

};

