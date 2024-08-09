const mongose= require('mongoose');

const mongoUri='mongodb+srv://kundanext123:kundan12345@cluster0.cjaigot.mongodb.net/mydata?retryWrites=true&w=majority&appName=Cluster0';

const connectToDb= ()=>{
    mongose.connect(mongoUri)
    .then(()=> console.log('Connected to Mongodb'))
    .catch((err)=>console.log('Failed to connect to MongoDB', err))
}
module.exports={connectToDb};