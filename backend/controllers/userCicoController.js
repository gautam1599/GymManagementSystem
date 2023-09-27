const UserCico=require('../models/usercicomodel');
  

const createCico=async(req,res,next)=>{
    const {email,location,checkintime,checkouttime}=req.body;
    // let existingCico;
    // try{
    //     existingCico=await UserCico.findOne({email:email});
    //     console.log(existingCico);
    // }catch(err){
    //     console.log(err);
    // }
    // if(existingCico){
    //     return res.status(400).json({message:"User cico already checkedin"});
    // }
    const cico= new UserCico({
        email,
        location,
        checkintime,
        checkouttime,
    });
    console.log("Adding Cico");

    try{
        await cico.save();
        console.log("saved");
    }catch (err){
        console.log(err);
    }

    return res.status(201).json({message:UserCico});
}

const viewCicos=async(req,res,next)=>{
    try{
      UserCico.find({})
        .exec()
        .then(UserCicos => {
          console.log(UserCicos);
          res.json(UserCicos);
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({ message: "Error retrieving Cicos." });
        });
    } catch(err){
      console.log(err);
      res.status(500).json({ message: "Error retrieving Cicos." });
    }
  }

  const editCico = async (req, res, next) => {
    const { email } = req.params;
    const { checkintime, checkouttime } = req.body;
  
    try {
      const cico = await UserCico.findOne({ email: email, checkouttime:null });
      if (!cico) {
        res.status(404).json({ message: "Cico not found" });
      } else {
        cico.checkintime = checkintime;
        cico.checkouttime = checkouttime;
  
        await cico.save();
        res.status(200).json({ message: "Cico updated successfully", cico });
      }
    } catch (error) {
      console.error("Error editing cico:", error);
      res.status(500).json({ message: "Error editing Cico" });
    }
  };

  const getNullCicos=async(req,res,next)=>{
    const { location } = req.params;
    try{
      UserCico.find({checkouttime: null, location:location})
        .exec()
        .then(UserCicos => {
          console.log(UserCicos);
          res.json(UserCicos);
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({ message: "Error retrieving Cicos." });
        });
    } catch(err){
      console.log(err);
      res.status(500).json({ message: "Error retrieving Cicos." });
    }
  }

  const getCicoByDateRange=async(req,res,next)=>{
    const {startdate,enddate}=req.body;
    let cicos;
    try{
        cicos=await UserCico.find({
            checkintime: {
              $gte: startdate,
              $lt: enddate
            }
        });
    }catch(err){
        return new Error(err);
    }
    if(!cicos){
        return res.status(400).json({message:"Usercicos not found"})
    }
    return res.status(200).json({cicos});
  }


module.exports={createCico,viewCicos,editCico,getNullCicos,getCicoByDateRange};