const express=require('express');
const path=require('path');
const app=express();

app.use('/',require('./main'));

const hostname="localhost";
const port=3000;
app.listen(port,hostname,()=>{
    console.log(`listening on http://${hostname}:${port}`);
});