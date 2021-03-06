/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
var chainService=require('../services/chainservice');
module.exports = {

    /**
     * 用户注册添加
     */
    register:async function(req,res){
        var email=req.body.email;
        var pwd=req.body.pwd;
        // var pwdtrade=req.body.pwdtrade;
        if(!email){
            return res.json({
                code:0,
                msg:"邮箱不能为空"
            });
        }
        if(!pwd){
            return res.json({
                code:0,
                msg:"密码不能为空"
            });
        }
       /* if(!pwdtrade){
            return res.json({
                code:0,
                msg:"交易密码不能为空"
            });
        }*/
        var user=await User.findOne({email:email});
        if(user){
            return res.json({
                code:0,
                msg:"该账号已存在"
            });
        }
        var timestamp = (new Date()).getTime();
        var usercreate=await User.findOrCreate({email:email},{email:email,pwd:pwd,create_time:timestamp});
        //添加地址
        var account=chainService.getAccount();
        //console.log(usercreate.id);
        await Usercurrency.create({user_id:usercreate.id,num:0,address:account.address,secret:account.privateKey});
        req.session.user = usercreate;

        res.json({
            code:1,
            msg:"添加成功"
        });

    },

    /**
     *
     * 用户登录
     */
    login: async function (req, res) {
        var email = req.param('email');
        var pwd = req.param('password');
        if (!email || !pwd) {
          return res.json({
            code:0,
            msg:'邮箱或密码不能为空'
          });
        }
        var user =await User.findOne({email: email});
        if (!user) {
            return res.json({
              code:0,
              msg:'用户不存在'
            });

          } else if (pwd != user.pwd) {
            return res.json({
              code:0,
              msg:'密码错误'

            });
          }

          req.session.user = user;
          return res.json({
            code:1,
            msg:'登录成功',
          });

      },

      /*
        *退出登录
        * @param req
        * @param res
        * */
       logout: function (req, res) {
        delete req.session.user;
        //return res.redirect('/Index/index');
        return res.json({
          code:1,
          msg:'退出成功',
        });
      },

  /**
   * 用户重置密码
   */
  resetPwd:async function(req,res){
    var email=req.body.email;
    var pwd=req.body.pwd;

    if(!email){
      return res.json({
        code:0,
        msg:"邮箱不能为空"
      });
    }
    if(!pwd){
      return res.json({
        code:0,
        msg:"密码不能为空"
      });
    }
    var user=await User.findOne({email:email});
    if(!user){
      return res.json({
        code:0,
        msg:"该账号还未注册"
      });
    }
    var usercreate=await User.update({email:email},{pwd:pwd});
    console.log('update usercreate:', usercreate);
    req.session.user = usercreate;
    res.json({
      code:1,
      msg:"密码修改成功"
    });

  },
      /**
       * 个人中心
       *
       */
      userCenter: async function(req,res){
        var user = req.session.user;
        if(!user){
            return res.json({
                code:0,
                msg:'你还没有登录',
              });
        }

        //获取充币地址
        var userCurrency= await Usercurrency.findOne({user_id:user.id});
        //获取捐献记录
        var trade=await Trade.find({user_id:user.id});
        //获取中奖记录
        var reward= await Reward.find({user_id:user.id});
        //获取中奖记录的订单号
        for(var i=0;i<reward.length;i++){
            reward[i]['order_no']=await Order.findOne({id:reward[i].order_id});

        }
        //获取余额
        var balance=chainService.getBalance(userCurrency.address);
        //获取提币记录
        var tibi=await Tibi.find({user_id:user.id});
        //用户订单
        var order=await Order.find({user_id:user.id});
        return res.json({
            code:1,
            user:user,
            userCurrency:userCurrency,
            trade:trade,
            reward:reward,
            balance:balance,
            tibi:tibi,
            order:order
        });



      }



};

