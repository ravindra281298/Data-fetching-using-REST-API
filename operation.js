const assert=require('assert');

exports.get_minMarks=(db,myColl,id,callback)=>{
    const coll=db.collection(myColl);
    coll.find({"_id":id},{projection:{"topicAnalysis.Chemistry.minMarks":1,"topicAnalysis.Physics.minMarks":1,"topicAnalysis.Maths.minMarks":1,"_id":0}}).toArray((err,docs)=>{
        assert.equal(err,null);
        callback(docs);
    });
};

exports.get_maxMarks=(db,myColl,id,callback)=>{
    const coll=db.collection(myColl);
    coll.find({"_id":id},{projection:{"topicAnalysis.Chemistry.maxMarks":1,"topicAnalysis.Physics.maxMarks":1,"topicAnalysis.Maths.maxMarks":1,"_id":0}}).toArray((err,docs)=>{
        assert.equal(err,null);
        callback(docs);
    });
};

exports.get_avgMarks=(db,myColl,id,callback)=>{
    const coll=db.collection(myColl);
    coll.find({"_id":id},{projection:{"topicAnalysis.Chemistry.totalObtainedMarks":1,"topicAnalysis.Physics.totalObtainedMarks":1,"topicAnalysis.Maths.totalObtainedMarks":1,"numberOfStudents":1,"_id":0}}).toArray((err,docs)=>{
        assert.equal(err,null);
        callback(docs);    
    });
};
