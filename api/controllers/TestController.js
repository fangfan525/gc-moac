/**
 * TestController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

var chainService=require('../services/chainservice');
module.exports = {
    testList: async function(req,res){
        var account=chainService.getAccount();
        res.json({
            account:account
        });
        
    },
    testList2: async function(req,res){
        var balance=chainService.getBalance('0x8dd53213ff21a0708d0d6a74afc23c3f81da7ed4');
        
        var gasPrice=chainService.gasPrice();
        //return res.json({
        //   balance:balance,
        //   gasPrice:gasPrice
            
        //});
        
        var account = {address:"0x8dd53213ff21a0708d0d6a74afc23c3f81da7ed4",secret:"0xe4167e187b3e965a453a9eadc0f6f1f84d320708a0d58623dd970325b5d62903"};
 
        var toAddress = "0x5c2824d5a4ad5cc3d88bfc438f201c7149d3fb77";
        var amount = 1;

        var data = chainService.send(account.address, account.secret, toAddress, amount, txCount = -1,gasPrice.gasPrice);
        return res.json({
           //balance:balance,
           //gasPrice:gasPrice,
           data:data,
            
        });
    }
  

};

