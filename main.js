const MongoClient =require('mongodb').MongoClient;
const express=require('express');
const assert=require('assert');
const path=require('path');
const operation=require('./operation');
const bodyParser=require('body-parser');

const router=express.Router();
router.use(bodyParser.json());

const url='mongodb://localhost:27017/';
const dbName='luke-hydra-test-management-dev-beta';
const myColl="hierarchicalAnalysis";
var db=1;

MongoClient.connect(url,(err,client)=>{
    assert.equal(err,null);
    db=client.db(dbName);
    console.log(`connected to database: ${dbName}`);
});


router.get('/:id',(req,res)=>{
    if(!req.params.id){
        return res.status(400).json({msg:"invalid content :("});
    }
    console.log('inside the get functions..!!!');
    var id=req.params.id;
    operation.show(db,myColl,id,(docs)=>{
        res.json({msg:`docs:\n ${docs}`});
        console.log('data displayed..!!');
    });
    // res.json({msg:`id is: ${id}`});
});


module.exports=router;