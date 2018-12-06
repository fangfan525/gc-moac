/**
 * TibiController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    /**
     * 
     * 添加提币地址
     */
    addTibiAddress: async function(req,res){
        var user = req.session.user;
        if(!user){
            return res.json({
                code:0,
                msg:'你还没有登录',
              });
        }
        var address=req.body.address;
        var timestamp = (new Date()).getTime();
        await Usertibi.create({user_id:user.id,create_time:timestamp,address:address});
        return res.json({
            code:1,
            msg:"添加成功"
             
         });

    },

    /**
     * 申请提币
     */
    tibi: async function(){
        var user = req.session.user;
        if(!user){
            return res.json({
                code:0,
                msg:'你还没有登录',
              });
        }
        var num=req.body.num;
        var timestamp = (new Date()).getTime();
        await Tibi.create({user_id:user.id,num:num,create_time:timestamp,status:0});
        return res.json({
            code:1,
            msg:"添加成功"
             
         });
    }
  

};

