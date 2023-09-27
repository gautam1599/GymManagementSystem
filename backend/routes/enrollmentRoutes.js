const express=require('express');
const enrollmentFunctions=require('../controllers/enrollmentController');
const enrollmentrouter=express.Router();


enrollmentrouter.post('/addEnrollment',enrollmentFunctions.createEnrollment);
enrollmentrouter.get('/getEnrollmentByEmail/:email',enrollmentFunctions.getEnrollmentByEmail);
enrollmentrouter.get('/getEnrollmentByDateRange',enrollmentFunctions.getEnrollmentByDateRange);
//classrouter.put('/updateClass/:classId',classFunctions.updateEvent);
//enrollmentrouter.get('/viewClasses',classFunctions.viewEvents);
module.exports=enrollmentrouter;