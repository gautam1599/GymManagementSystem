const mongoose=require('mongoose')

const userCicoModel=mongoose.Schema(
    {
        email:{type:String, required:true},
        location:{type:String,required:true},
        checkintime:{type:Date},
        checkouttime:{type:Date}
    }
);

const UserCico=mongoose.model("UserCico",userCicoModel);

module.exports=UserCico;