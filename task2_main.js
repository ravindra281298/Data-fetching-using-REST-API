const MongoClient =require('mongodb').MongoClient;
const express=require('express');
const assert=require('assert');
const path=require('path');
const operation=require('./task2_operation');
const bodyParser=require('body-parser');

const router=express.Router();
router.use(bodyParser.json());

const url='mongodb://localhost:27017/database.log.2019-08-09T04-28-40';
const dbName="luke-hydra-test-management-dev-beta";
const myColl="masterresults";
var db=1;

MongoClient.connect(url,(err,client)=>{
    assert.equal(err,null);
    db=client.db(dbName);
    console.log(`connected to database: ${dbName}`);
});

var subject=["Chemistry","Physics","Maths"];
var Physics_marks=[[],[],[]],Chemistry_marks=[[],[],[]],Maths_marks=[[],[],[]];  //w,u,c

router.post('/',(req,res)=>{
    var arr=req.body.id;
    for(var i=0;i<arr.length;i++){
        operation.get_cwu(db,myColl,arr[i],(docs)=>{
            // console.log(docs[0].cwuAnalysis.Chemistry.marks);
            for(var j=0;j<docs.length;j++){
                Physics_marks[0].push(docs[j].cwuAnalysis.Physics.marks['W']);
                Physics_marks[1].push(docs[j].cwuAnalysis.Physics.marks['U']);
                Physics_marks[2].push(docs[j].cwuAnalysis.Physics.marks['C']);

                Chemistry_marks[0].push(docs[j].cwuAnalysis.Chemistry.marks['W']);
                Chemistry_marks[1].push(docs[j].cwuAnalysis.Chemistry.marks['U']);
                Chemistry_marks[2].push(docs[j].cwuAnalysis.Chemistry.marks['C']);

                Maths_marks[0].push(docs[j].cwuAnalysis.Maths.marks['W']);
                Maths_marks[1].push(docs[j].cwuAnalysis.Maths.marks['U']);
                Maths_marks[2].push(docs[j].cwuAnalysis.Maths.marks['C']);
            }
        });
    }
    res.json({msg:'done'});
});

router.get('/',(req,res)=>{
    res.json({msg:Chemistry_marks});
});

module.exports=router;