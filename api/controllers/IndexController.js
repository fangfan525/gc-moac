/**
 * IndexController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    //首页数据
    index:async function(req,res){
        //获取推荐项目
        var product=await Product.find({is_recommend:1,is_online:1});
        //获取中奖公告
        var reward= await Reward.find();
        //获取中奖记录的订单号
        for(var i=0;i<reward.length;i++){
            reward[i]['userinfo']=await User.findOne({id:reward.user_id});

        }
        return res.json({
            code:1,
            product:product,
            notice:reward
        });

    }
  

};

