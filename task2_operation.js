const assert=require('assert');

exports.get_cwu=(db,myColl,id,callback)=>{
    const coll=db.collection(myColl);
    coll.find({"accessTag.hierarchy":id},{"cwuAnalysis.Chemistry.marks":1,"cwuAnalysis.Physics.marks":1,"cwuAnalysis.Maths.marks":1,"_id":0}).toArray((err,docs)=>{
        assert.equal(err,null);
        callback(docs);
    });
};