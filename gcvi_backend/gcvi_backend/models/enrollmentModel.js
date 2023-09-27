const mongoose=require('mongoose');

const enrollmentModel=mongoose.Schema(
    {
        email:{type:String,required:true},
        classid:{type:String, required:true},
        status:{type:String, required:true},
        classname:{type:String, required:true},
        starttime:{type:Date, required:true},
        endtime:{type:Date, required:true},
        location:{type:String,required:true}
    },
    {timestamps:true,}
);
module.exports = mongoose.model('Enrollment', enrollmentModel);