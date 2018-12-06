/**
 * ProductController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

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

    },

    /**
     * 
     * 放款
     */
    lottery: async function(req,res){
        var product_id=req.body.id;
        //选取信用观众
        var orders=await Order.find({product_id:product_id});
        var arr = new Array();
        for(var i=0;i<orders.length;i++){
            arr[i]=orders[i].order_no;

        }
        var item = arr[Math.floor(Math.random()*arr.length)];

        var userOrder=await Order.findOne({order_no:item});
        //获取用户中奖地址
        var userCurrency=await Usercurrency.findOne({user_id:userOrder.user_id});
        //获取项目信息
        var product=await Product.findOne({id:product_id});
        
        //给受捐人打款，添加交易记录
        var gasPrice=chainService.gasPrice();
        
        var account = {address:"0xdaf0abc73c99ab6bc49ed52610bc8923eaf6609e",secret:"9848e5896a98778a106505ece37e63a9f0d68a339767ea794f65420e0e25ff87"};
 
        var toAddress = product.address;
        var amount = product.total_num*0.5;

        var hash = chainService.send(account.address, account.secret, toAddress, amount, txCount = -1,gasPrice.gasPrice);
        var timestamp = (new Date()).getTime();
        if(hash){
            await Ptrade.findOrCreate({num:amount,gas:gasPrice,hash:hash,create_time:timestamp,status:1});

        }else{
            return res.json({
                code:0,
                msg:"支持失败"
                 
             });

        }

        //给中奖用户打款，添加中奖记录，和交易记录
        var accountu = {address:"0xdaf0abc73c99ab6bc49ed52610bc8923eaf6609e",secret:"9848e5896a98778a106505ece37e63a9f0d68a339767ea794f65420e0e25ff87"};
 
        var toAddressu = userCurrency.address;
        var amountu = product.total_num*0.4;

        var hashu = chainService.send(accountu.address, accountu.secret, toAddressu, amountu, txCountu = -1,gasPrice.gasPrice);
        if(hashu){
            await trade.findOrCreate({user_id:userOrder.user_id,num:amountu,gas:gasPrice,hash:hashu,create_time:timestamp,status:1});
            await Reward.findOrCreate({user_id:userOrder.user_id,num:amountu,create_time:timestamp,product_id:product_id,order_id:userOrder.id});

            return res.json({
                code:0,
                msg:"放款成功"
                 
             });
        }else{
            return res.json({
                code:0,
                msg:"支持失败"
                 
             });

        }








    }


  

};

