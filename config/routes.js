//controllers/routes.js
/**
 *Mapping routes to send a request to controllers 
 * 
 */
var express = require('express');
var transactionController = require('../transactions/transaction.controller');
var userController = require('../users/user.controller');
var router = express.Router();
var testeController = require('../users/contactList.controller');

router.get('/',function(req, res){
    res.send("Hello World");
})

//Users
router.post('/user',userController.registerUser);
router.post('/userFromTransaction', userController.registerUserFromTransaction);
router.delete('/deleteUser/:id', userController.deleteUser);
router.get('/user/:phone', userController.getUser);
router.get('/users', userController.getListAllUsers);
router.post('/contacts', testeController.getContact);

//Transactions
router.get('/transactions', transactionController.getListTransactions);
router.get('/pendingTransactions/:phone', transactionController.getListTransactionPendencies);
router.get('/transactions/:phone', transactionController.getListTransactionsByUser);
router.get('/transaction/:id',transactionController.getTransaction);
router.delete('/transaction/:id', transactionController.deleteTransaction);
router.put('/transaction', transactionController.updateTransaction);
router.post('/transaction', transactionController.createTransaction);

module.exports = router;  