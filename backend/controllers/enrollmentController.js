const Enrollment=require('../models/enrollmentModel');

const createEnrollment=async(req,res,next)=>{
    const {email,classid,status,starttime,endtime,classname,location}=req.body;
    //let existingEnrollment;
    // try{
    //     existingEvent=await Event.findOne({classid:classid});
    //     console.log(existingEvent);
    // }catch(err){
    //     console.log(err);
    // }
    // if(existingEvent){
    //     console.log("Event already exists");
    //     return res.status(400).json({message:"Event already exists"});
    // }
    const enrollment= new Enrollment({
        email,
        classid,
        status,
        starttime,
        endtime,
        classname,
        location
    });
    console.log("Enrolling user");

    try{
        await enrollment.save();
        console.log("saved");
    }catch (err){
        console.log(err);
    }

    return res.status(201).json({message:Enrollment});
}

const getEnrollmentByEmail=async(req,res,next)=>{
    const userEmail=req.params.email;
    let enrollment;
    try{
        enrollment=await Enrollment.find({email:userEmail});
    }catch(err){
        return new Error(err);
    }
    if(!enrollment){
        return res.status(400).json({message:"Enrollments not found"})
    }
    return res.status(200).json({enrollment});
}

const getEnrollmentByDateRange=async(req,res,next)=>{
    const {startdate,enddate,location}=req.body;
    let enrollments;
    try{
        enrollments=await Enrollment.find({location:location,
            starttime: {
              $gte: startdate
            },
            endtime:{
                $lte: enddate
            }
        });
    }catch(err){
        return new Error(err);
    }
    if(!enrollments){
        return res.status(400).json({message:"Enrollments not found"})
    }
    return res.status(200).json({enrollments});
  }

module.exports={createEnrollment,getEnrollmentByEmail,getEnrollmentByDateRange};