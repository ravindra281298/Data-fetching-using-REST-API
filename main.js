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

var subject=["Chemistry","Physics","Maths"];
var minMarks=[10000,10000,10000];
var maxMarks=[-10000,-10000,-10000];
var avgMarks=[0,0,0];
var num=-1;



router.post('/',(req,res)=>{
    var arr=req.body.id;
    for(var i=0;i<avgMarks.length;i++)
    avgMarks[i]=0;
    for(var i=0;i<arr.length;i++){
        num=0;
        operation.get_minMarks(db,myColl,arr[i],(docs)=>{
            for(var j=0;j<subject.length;j++){
                num=docs[0].topicAnalysis[subject[j]].minMarks;
                if(num<minMarks[j])
                minMarks[j]=num;
                // console.log(num);
            }
        });
        operation.get_maxMarks(db,myColl,arr[i],(docs)=>{
            for(var j=0;j<subject.length;j++){
                num=docs[0].topicAnalysis[subject[j]].maxMarks;
                if(num>maxMarks[j])
                maxMarks[j]=num;
                // console.log(num);
            }
        });
        operation.get_avgMarks(db,myColl,arr[i],(docs)=>{
            for(var j=0;j<subject.length;j++){
                avgMarks[j]+=((docs[0].topicAnalysis[subject[j]].totalObtainedMarks)/(docs[0].numberOfStudents));
            }
            // console.log(docs);
        });
    }
    res.json({msg:'done'});
});

          
router.get('/',(req,res)=>{
    // console.log(minMarks,maxMarks);
    res.json({Subjects:`MinMarks MaxMarks AvgMarks`,
              Chemistry:`${minMarks[0]}      ${maxMarks[0]}     ${avgMarks[0].toFixed(2)}`,
              Physics:`  ${minMarks[1]}      ${maxMarks[1]}     ${avgMarks[1].toFixed(2)}`,
              maths:`    ${minMarks[2]}      ${maxMarks[2]}     ${avgMarks[2].toFixed(2)}`});
});

module.exports=router;


// console.log(docs[0].topicAnalysis["Chemistry"].minMarks);
            // num=docs[0].topicAnalysis.Chemistry.minMarks;
            // if(num<minMarks[0]){
            //     minMarks[0]=num;
            // }
            // num=docs[0].topicAnalysis.Physics.minMarks;
            // if(num<minMarks[1]){
            //     minMarks[1]=num;
            // }
            // num=docs[0].topicAnalysis.Maths.minMarks;
            // if(num<minMarks[2]){
            //     minMarks[2]=num;
            // }