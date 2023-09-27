const mongoose=require('mongoose');

const logModel=mongoose.Schema(
    {
        machinetype:{type:String,required:true},
        email:{type:String, required:true},
        location:{type:String},
        hours:{type:Number, required:true},
        date:{type:Date,required:true}
    },
    
);

module.exports = mongoose.model('Log', logModel);