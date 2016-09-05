/**
 *Group Schema 
 * 
 */
var mongoose = require('mongoose');

var groupSchema = mongoose.Schema({
    title:{type:String, required:true},
    members:[{
		name:String,
		phone:{value:{type: String, required:true, ref: 'User' }},
		registrationFlag:Boolean,
		flagGroup: Boolean
	}],
	creator:{type: String, required:true, ref: 'User.phone.value' },
	updatedAt:Date,
	createdAt:Date,
	finalizedAt:Date
})

groupSchema.pre('save', function(next){
//get current date
var currentDate = new Date();

//change the updated_at fielt to current date
this.updatedAt = currentDate;

// if createdAt doesn't exist
if(!this.createdAt)
    this.createdAt = currentDate;
next();

});

module.exports = mongoose.model('Group', groupSchema);