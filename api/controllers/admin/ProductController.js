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
            data:product
        });


    },
    
  

};

