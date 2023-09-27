const express=require('express');
const logFunctions=require('../controllers/logsController');
const logrouter=express.Router();


logrouter.post('/addLog',logFunctions.createLogs);
//classrouter.put('/updateClass/:classId',classFunctions.updateEvent);
logrouter.get('/viewLog',logFunctions.viewLogs);
logrouter.post('/getLogByEmail',logFunctions.getLogsByEmail)
logrouter.get('/getLogsByDate',logFunctions.getLogsByDate);
logrouter.post('/getLogsByDateRange',logFunctions.getLogsByDateRange);
module.exports=logrouter;