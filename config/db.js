
const mongoose = require('mongoose');

const connectWithDB = ()=>{
    mongoose.connect(process.env.DATABASE_URL ,{ useNewUrlParser: true, useUnifiedTopology: true } )
    const db = mongoose.connection
    db.on('error', (err)=> console.error(err))
    db.once('open' , ()=> console.log('[STATUS] Connected to Database'))
}


module.exports = connectWithDB;
