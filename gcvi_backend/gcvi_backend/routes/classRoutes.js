const express=require('express');
const classFunctions=require('../controllers/classController');
const classrouter=express.Router();


classrouter.post('/addClass',classFunctions.createEvent);
//classrouter.put('/updateClass/:classId',classFunctions.updateEvent);
classrouter.get('/viewClasses',classFunctions.viewEvents);
classrouter.get('/getClassesByLocation/:location',classFunctions.viewEventsByLocation)
module.exports=classrouter;