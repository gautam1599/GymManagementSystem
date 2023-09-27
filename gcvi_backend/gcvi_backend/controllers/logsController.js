const Log=require('../models/logsModel');
  

const createLogs=async(req,res,next)=>{
    const {machinetype,email,date,hours,location}=req.body;
    // let existingCico;
    // try{
    //     existingCico=await UserCico.findOne({id:id});
    //     console.log(existingCico);
    // }catch(err){
    //     console.log(err);
    // }
    // if(existingCico){
    //     console.log("Cico already exists");
    //     return res.status(400).json({message:"Cico already exists"});
    // }
    const log= new Log({
        location,
        machinetype,
        email,
        date,
        hours,
    });
    console.log("Adding Log");

    try{
        await log.save();
        console.log("saved");
    }catch (err){
        console.log(err);
    }

    return res.status(201).json({message:Log});
}

const viewLogs=async(req,res,next)=>{
    try{
      Log.find({})
        .exec()
        .then(Logs => {
          console.log(Logs);
          res.json(Logs);
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({ message: "Error retrieving logs." });
        });
    } catch(err){
      console.log(err);
      res.status(500).json({ message: "Error retrieving logss." });
    }
  }

  const getLogsByEmail=async(req,res,next)=>{
    const userEmail=req.body.email;
    let logs;
    try{
        logs=await Log.find({email:userEmail});
    }catch(err){
        return new Error(err);
    }
    if(!logs){
        return res.status(400).json({message:"Enrollments not found"})
    }
    return res.status(200).json({logs});
}

const getLogsByDate=async(req,res,next)=>{
  const {date,location,machinetype}=req.body;
  let logs;
  try{
      logs=await Log.find({location:location,machinetype:machinetype,date:date});
  }catch(err){
      return new Error(err);
  }
  if(!logs){
      return res.status(400).json({message:"Enrollments not found"})
  }
  return res.status(200).json({logs});
}

const getLogsByDateRange=async(req,res,next)=>{
  const {startdate,enddate,location,machinetype}=req.body;
  let logs;
  try{
      logs=await Log.find({location:location,machinetype:machinetype,
          date: {
            $gte: startdate,
            $lt: enddate
          }
      });
  }catch(err){
      return new Error(err);
  }
  if(!logs){
      return res.status(400).json({message:"Enrollments not found"})
  }
  return res.status(200).json({logs});
}


module.exports={createLogs,viewLogs,getLogsByEmail,getLogsByDate,getLogsByDateRange};