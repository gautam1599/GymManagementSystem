const express=require('express');
const cicoFunctions=require('../controllers/userCicoController');
const cicorouter=express.Router();


cicorouter.post('/addCico',cicoFunctions.createCico);
cicorouter.put('/editCico/:email',cicoFunctions.editCico);
cicorouter.get('/viewCicos',cicoFunctions.viewCicos);
cicorouter.get('/viewNullCicos/:location',cicoFunctions.getNullCicos);
cicorouter.get('/getCicoByDateRange',cicoFunctions.getCicoByDateRange);
module.exports=cicorouter;