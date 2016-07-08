/**
 *Transaction Schema 
 * 
 */
var mongoose = require('mongoose');
 
var transactionSchema = mongoose.Schema({
	value: Number,
	status: String,
	debtor: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	creditor: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}	
});

transactionSchema.pre('save', function(next){
//get current date
var currentDate = new Date();

//change the updated_at fielt to current date
this.updated_at = currentDate;

// if created_at doesn't exist
if(!this.created_at)
    this.created_at = currentDate;

next();

});

module.exports = mongoose.model('Transaction', transactionSchema);