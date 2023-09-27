const mongoose=require("mongoose");
const uri='mongodb+srv://gciv:gciv@cluster0.hp9ccei.mongodb.net/?retryWrites=true&w=majority';

const connectDb=async()=>{
    try{
        const conn= await mongoose.connect(uri,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        })
        console.log("MongoDB connected:",conn.connection.host);
    } catch(error){
        console.log("Error:",error);
    }
}

module.exports=connectDb;