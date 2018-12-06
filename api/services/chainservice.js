var Chain3 = require('chain3');
var chain3 = new Chain3(new Chain3.providers.HttpProvider('http://39.105.128.51:8545'));
var crypto = require('crypto');         //npm install  -g crypto
var secp256k1 = require('secp256k1');   //npm install  -g secp256k1
var keccak = require('keccak');         //npm install  -g keccak

module.exports = {

    /**
     * 
     * 
     * 生成账号 
     */
    getAccount1:function(){
        var privateKey = crypto.randomBytes(32);
        //获得公钥
        var publicKey = secp256k1.publicKeyCreate(privateKey, false).slice(1);
        //获得地址
        var address = keccak('keccak256').update(publicKey).digest().slice(-20);
        return {
            publicKey:publicKey.toString('hex'),
            privateKey:privateKey.toString('hex'),
            address:address.toString('hex')
        };
    },

    /**
     * 
     * 
     * 生成账号 
     */
    getAccount:function(){
        var Wallet = require('ethereumjs-wallet');    //npm install -g ethereumjs-wallet
        const wallet = Wallet.generate();

        return {
            
            privateKey:wallet.getPrivateKeyString(),
            address:wallet.getAddressString()
        };
    },

    /**
     * 发送交易
     */
    
    send: function(fromAddress, fromSecret, toAddress, amount, txCount = -1,gasPrice){
        
    var mc = chain3.mc;
    
    var txcount = txCount >= 0 ? txCount : chain3.mc.getTransactionCount(fromAddress);
    console.log("Get tx account", txcount);
    //var gasPrice = chain3.mc.gasPrice;
    //var gasPrice = 20000000000;
    var gasLimit = 100000;
    var value = chain3.toSha(amount, 'mc');
    var gasTotal = gasPrice * gasLimit + Number(value);
    console.log(gasPrice, gasLimit, value, chain3.fromSha(gasTotal, 'mc'));
    
    var rawTx = {
        from: fromAddress,
        to: toAddress,
        nonce: chain3.intToHex(txcount),
        gasPrice: chain3.intToHex(gasPrice),
        gasLimit: chain3.intToHex(gasLimit),
        value: chain3.intToHex(value),
        shardingFlag: 0, //default is global contract
        chainId: chain3.version.network
    };
    
    var signedTx = chain3.signTransaction(rawTx, fromSecret);
      var data = mc.sendRawTransaction(signedTx);
      return data;
            
    // mc.sendRawTransaction(signedTx, function(err, hash) {
    //     if (!err){
    //         console.log("succeed: ", hash);
    //         return hash;
    //         //return {
    //          //   hash:hash
    //         //}
    //     }else{
    //         console.log("error:", err);
    //         console.log('raw tx:', rawTx);
    //         return {
    //             error:err,
    //             rawtx:rawTx
    //         }
    //     }
    // });
    },
    
    /**
     * 
     * 获取指定地址的余额
     */
    getBalance:function(address){
        var balance = chain3.mc.getBalance(address);
        return {
            balance:balance.toString(10)
        };

    },

    /**
     * 
     * 获取最近的gasprice
     */
    gasPrice:function(){
        var gasPrice = chain3.mc.gasPrice;
        return {
            gasPrice:gasPrice.toString(10)
        };

    }



}