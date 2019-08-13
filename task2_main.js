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
var n=5;      // no of records to be displayed.

router.post('/',(req,res)=>{
    var arr=req.body.id;
    n=req.body.n;
    for(var i=0;i<arr.length;i++){
        operation.get_cwu(db,myColl,arr[i],(docs)=>{
            // console.log(docs[0].cwuAnalysis.Chemistry.marks);
            for(var j=0;j<docs.length;j++){
                Physics_marks[0].push({value:docs[j].cwuAnalysis.Physics.marks['W'],_id:docs[j]._id});
                Physics_marks[1].push({value:docs[j].cwuAnalysis.Physics.marks['U'],_id:docs[j]._id});
                Physics_marks[2].push({value:docs[j].cwuAnalysis.Physics.marks['C'],_id:docs[j]._id});

                Chemistry_marks[0].push({value:docs[j].cwuAnalysis.Chemistry.marks['W'],_id:docs[j]._id});
                Chemistry_marks[1].push({value:docs[j].cwuAnalysis.Chemistry.marks['U'],_id:docs[j]._id});
                Chemistry_marks[2].push({value:docs[j].cwuAnalysis.Chemistry.marks['C'],_id:docs[j]._id});

                Maths_marks[0].push({value:docs[j].cwuAnalysis.Maths.marks['W'],_id:docs[j]._id});
                Maths_marks[1].push({value:docs[j].cwuAnalysis.Maths.marks['U'],_id:docs[j]._id});
                Maths_marks[2].push({value:docs[j].cwuAnalysis.Maths.marks['C'],_id:docs[j]._id});
            }
        });
    }
    res.json({msg:'done'});
});

function arrange_all_data(){
    Chemistry_marks[0].sort((a,b)=>{return a.value>b.value ? 1:-1;});  //asc
    Chemistry_marks[1].sort((a,b)=>{return a.value<b.value ? 1:-1;});  //desc
    Chemistry_marks[2].sort((a,b)=>{return a.value<b.value ? 1:-1;});  //desc

    Maths_marks[0].sort((a,b)=>{return a.value>b.value ? 1:-1;});  //asc
    Maths_marks[1].sort((a,b)=>{return a.value<b.value ? 1:-1;});  //desc
    Maths_marks[2].sort((a,b)=>{return a.value<b.value ? 1:-1;});  //desc
    
    Physics_marks[0].sort((a,b)=>{return a.value>b.value ? 1:-1;});  //asc
    Physics_marks[1].sort((a,b)=>{return a.value<b.value ? 1:-1;});  //desc
    Physics_marks[2].sort((a,b)=>{return a.value<b.value ? 1:-1;});  //desc
}

router.get('/',(req,res)=>{
    // console.log(Chemistry_marks[0]);
     arrange_all_data();
    // console.log(Chemistry_marks[0]);
    res.json({Chemistry:{"Wrong":Chemistry_marks[0].slice(0,n),"UnAttempted":Chemistry_marks[1].slice(0,n),"Correct":Chemistry_marks[2].slice(0,n)},
             Physics:{"Wrong":Physics_marks[0].slice(0,n),"UnAttempted":Physics_marks[1].slice(0,n),"Correct":Physics_marks[2].slice(0,n)},
             Maths:{"Wrong":Maths_marks[0].slice(0,n),"UnAttempted":Maths_marks[1].slice(0,n),"Correct":Maths_marks[2].slice(0,n)}});
});

module.exports=router;