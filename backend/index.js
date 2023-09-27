const express=require("express");
const dotenv=require("dotenv");
const connectDb=require("./config/db");
const cors=require('cors');
const app=express();
app.use(cors(
    {
        origin:["https://gym-management-frontend-pi.vercel.app"],
        methods:["POST","GET"],
        credentials:true
    }
));
const cookieParser=require('cookie-parser');
const userrouter=require('./routes/userRoutes');
const classrouter=require('./routes/classRoutes');
const cicorouter=require('./routes/cicoRoutes');
const enrollmentrouter = require("./routes/enrollmentRoutes");
const logrouter= require("./routes/logRoutes");
dotenv.config();
app.use(express.json());
app.use(cookieParser());

connectDb();

app.use('/api',userrouter);
app.use('/class',classrouter);
app.use('/cico',cicorouter);
app.use('/enroll',enrollmentrouter);
app.use('/log',logrouter);

app.get("/",(req,res)=>{
    res.send("API running");
})

const PORT=  5001;

app.listen(PORT,console.log(`Server running on ${PORT}`))