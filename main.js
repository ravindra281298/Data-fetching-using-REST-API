const MongoClient =require('mongodb').MongoClient;
const express=require('express');
const assert=require('assert');
const path=require('path');
const operation=require('./operation');
const bodyParser=require('body-parser');

const router=express.Router();
router.use(bodyParser.json());

const url='mongodb://localhost:27017/database.log.2019-08-09T04-28-40';
const dbName="luke-hydra-test-management-dev-beta";
const myColl="hierarchicalAnalysis";
var db=1;

MongoClient.connect(url,(err,client)=>{
    assert.equal(err,null);
    db=client.db(dbName);
    console.log(`connected to database: ${dbName}`);
});

var subject=["Chemistry","Maths","Physics"];

/*
router.post('/',(req,res)=>{
    var arr=req.body.id;
    var minMarks=[],marMarks=[];
    for(var i=0;i<arr.length;i++){
        operation.show(db,myColl,arr[i],(docs)=>{
            console.log(docs);
            minMarks.push(docs);
        });   
    }
    res.json({msg:"done",minMarks});
})
*/
          
router.get('/:id',(req,res)=>{
    if(req.params.id.length<55 || !req.params.id){
        return res.status(400).json({msg:"invalid content :("});
    }
    var id=req.params.id;
    console.log('inside the get functions..!!!');
    // res.json({msg:`id is: ${id}`});
    
    operation.show(db,myColl,id,(docs)=>{
        // res.json({msg:`docs:\n ${docs.parent}`});
        console.log(docs[0].topicAnalysis.Chemistry.minMarks);    // to fetch content from array :)
        res.json({msg:'data\n',docs});
        console.log('data displayed..!!');
    });
});

module.exports=router;