const assert=require('assert');

exports.show=(db,myColl,id,callback)=>{
    const coll=db.collection(myColl);
    coll.findOne({"_id":id}).topicAnalysis.Chemistry.maxMarks.toArray((err,docs)=>{
        assert.equal(err,null);
        callback(docs);
    });
};