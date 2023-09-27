const mongoose=require('mongoose');

const classModel=mongoose.Schema(
    {
        classname:{type:String,required:true},
        location:{type:String,required:true},
        classid:{type:String, required:true, unique:true},
        starttime:{type:Date, required:true},
        endtime:{type:Date, required:true},
    }
);

module.exports = mongoose.model('Event', classModel);