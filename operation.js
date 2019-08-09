const assert=require('assert');

exports.show=(db,myColl,id,callback)=>{
    const coll=db.collection(myColl);
    coll.find({},{projection:{"parent":1,"_id":0}}).toArray((err,docs)=>{
        assert.equal(err,null);
        // console.log(docs.childCode);
        callback(docs);
    });
};

// coll.findOne({"_id":id}).topicAnalysis.Chemistry.maxMarks.toArray((err,docs)=>{
