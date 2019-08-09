const assert=require('assert');
var num=1;
exports.show=(db,myColl,id,callback)=>{
    const coll=db.collection(myColl);
    coll.find({"_id":id},{projection:{"topicAnalysis.Chemistry.minMarks":1,"_id":0}}).toArray((err,docs)=>{
        assert.equal(err,null);
        // console.log(docs.childCode);
        num=docs;
        callback(num);
    });
};

// coll.findOne({"_id":id}).topicAnalysis.Chemistry.maxMarks.toArray((err,docs)=>{

//coll.find({"_id":id},{projection:{"topicAnalysis.Chemistry.minMarks":1,"_id":0}}).toArray((err,docs)=>{