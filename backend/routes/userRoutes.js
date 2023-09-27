const express=require('express');
const userFunctions=require('../controllers/userController');
const router=express.Router();


router.get('/',(req,res,next)=>{
    res.send('Hello gautam');
})

router.post('/signup',userFunctions.signup);
router.post('/login',userFunctions.login);
router.get('/getUser/:email',userFunctions.getUserProfile);
router.get('/getUsersByLocation/:location',userFunctions.getUsersByLocation);
router.get('/getAllUsers',userFunctions.getAllUsers);
module.exports=router;