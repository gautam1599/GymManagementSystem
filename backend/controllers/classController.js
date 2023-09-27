const Event=require('../models/classModel');
  

const createEvent=async(req,res,next)=>{
    const {classname,location,classid,starttime,endtime}=req.body;
    let existingEvent;
    try{
        existingEvent=await Event.findOne({classid:classid});
        console.log(existingEvent);
    }catch(err){
        console.log(err);
    }
    if(existingEvent){
        console.log("Event already exists");
        return res.status(400).json({message:"Event already exists"});
    }
    const event= new Event({
        classname,
        classid,
        location,
        starttime,
        endtime,
    });
    console.log("Adding Event");

    try{
        await event.save();
        console.log("saved");
    }catch (err){
        console.log(err);
    }

    return res.status(201).json({message:Event});
}

const viewEvents=async(req,res,next)=>{
    try{
      Event.find({})
        .exec()
        .then(Events => {
          console.log(Events);
          res.json(Events);
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({ message: "Error retrieving Events." });
        });
    } catch(err){
      console.log(err);
      res.status(500).json({ message: "Error retrieving Events." });
    }
  }

  const viewEventsByLocation=async(req,res,next)=>{
    const loc=req.params.location;
    try{
      Event.find({location:loc})
        .exec()
        .then(Events => {
          console.log(Events);
          res.json(Events);
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({ message: "Error retrieving Events." });
        });
    } catch(err){
      console.log(err);
      res.status(500).json({ message: "Error retrieving Events." });
    }
  }


module.exports={createEvent,viewEvents,viewEventsByLocation};