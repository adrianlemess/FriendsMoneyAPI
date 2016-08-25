var express = require('express'),
    transactionService = require('./transaction.service'),
    constant = require('./transaction.constants.json'),
    Transaction = require('./transaction.schema');

module.exports = {
    
    createTransaction:function (req, res, next) {
        console.log(req.body);
        var newTransaction = new Transaction({
            creator:req.body.creator,
            valueTotal: req.body.valueTotal,
            status: req.body.status,
            debtor: req.body.debtor,
            creditor: req.body.creditor
        });
        

        if (typeof newTransaction.valueTotal  == 'undefined' ||  typeof newTransaction.status  == 'undefined' || typeof newTransaction.debtor == 'undefined'|| typeof newTransaction.creditor == "undefined") {
            res.json({status:400,  error: constant.error.msg_invalid_param});
        }else {
            transactionService.createTransaction(newTransaction, function(response){
               
                if (response){
                    res.json(response);
                }else {
                    res.sendStatus(400);
                }
            })
        }
    },

    getListTransactions:function (req, res, next) {
        transactionService.getListTransactions(function(transactions){
            if (transactions){
                res.json(transactions);
            }else {
                res.sendStatus(404);
            }
        })
    },
    
    getListTransactionPendencies:function(req, res, next){
        var phone = req.params.phone;
        if ( typeof phone == 'undefined'){
            res.json(400, { error: constant.error.msg_invalid_param});
        }else {
            transactionService.getListTransactionsPendencies(phone, function(transactions){
                if (transactions){
                    console.log(transactions);
                    res.json(transactions);
                }else {
                    res.sendStatus(404);
                }
            })
        }  
    },

    getListTransactionsByUser:function (req, res, next) {
        var phone = req.params.phone;
        if ( typeof phone == 'undefined'){
            res.json(400, { error: constant.error.msg_invalid_param});
        }else {
            transactionService.getListTransactionsByUser(phone, function(response){  
                if (response){     
                    res.json(response);
                }else {    
                    res.json({});
                }
            })
        }
    },

    getTransaction:function (req, res, next) {
        var id = req.params.id;
        if ( typeof id == 'undefined'){
            res.json(400, { error: constant.error.msg_invalid_param});
        }else {
            transactionService.getTransaction(id, function(transaction){
                if (transaction){
                    res.json(transaction);
                }else {
                    res.sendStatus(404);
                }
            })
        }
    },

    deleteTransaction:function (req, res, next) {
        var id = req.params.id;
        if ( typeof id == 'undefined'){
            res.json(400, { error: constant.error.msg_invalid_param});
        }else {
            transactionService.deleteTransaction(id, function(response){
                if (response){
                    res.json(response);
                }else {
                    res.sendStatus(404);
                }
            })
        }
    },

    updateTransaction:function (req, res, next) {
            console.log(req.body);
         var updateTransaction = new Transaction(req.body);
         console.log(updateTransaction);
        if ( typeof updateTransaction.valueTotal  == 'undefined' ||  typeof updateTransaction.status  == 'undefined' || typeof updateTransaction.debtor == 'undefined'|| typeof updateTransaction.creditor == "undefined") {
            res.status(400).json({ error: constant.error.msg_invalid_param});
        }else {
            transactionService.updateTransaction(updateTransaction, function(response){
                if (response){
                    res.json(response);
                }else {
                    res.sendStatus(400);
                }
            })
        }
    }
}