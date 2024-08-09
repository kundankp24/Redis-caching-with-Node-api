const express= require('express');
// const mongoose= require('mongoose');
const profileRoutes= require('./routes/profile');
const {connectToDb}= require('./db');
const redisClient= require('./redisClient');

const app= express();
const port=3000;

app.use(express.json());
app.use('/profile', profileRoutes);

connectToDb();

redisClient.on('connect', ()=>{
    console.log('Connected to Redis')
});

redisClient.on('error', ()=>{
    console.log('Redis error', err)
});

process.on('uncaughtException', (err)=>{
    console.log('Uncaught Exception: ', err);
});

//global error handling for unhandled rejections and exceptions
process.on('unhandledRejection', (reason, promise)=>{
    console.log('Unhandled Rejection at: ', promise, 'reason: ', reason);
});

app.listen(port, ()=>{
    console.log(`Server is running on http://localhost:${port}`)
});


