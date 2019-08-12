const express=require('express');
const path=require('path');
const app=express();

// app.use('/',require('./main'));   //task 1

app.use('/',require('./task2_main'));   //task2

const hostname="localhost";
const port=3000;
app.listen(port,hostname,()=>{
    console.log(`listening on http://${hostname}:${port}`);
});