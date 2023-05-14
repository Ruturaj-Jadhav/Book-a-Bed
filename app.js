// Imports
if(process.env.NODE_ENV !== 'production'){
	require('dotenv').config()
}
const express = require('express')
const bodyParser = require('body-parser')
const connectWithDB = require('./config/db');
const bookingRoutes =  require('./routes/bookingRoutes');
const authRoutes = require('./routes/authRoutes');
const paymentRoutes = require('./routes/paymentRoutes'); 

// Create an instance of express app
const app = express()
// Set port
const port = process.env.PORT || '3000'

// Configure folders containing static files
app.use(express.static('public'));
app.use('/images', express.static(__dirname + 'public/images'));

// Configure Template Engine
// app.use(expressLayouts)
// app.set('layout', './layouts/default')
app.set('view engine', 'ejs')

// Configure bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended:true
}));

app.use('/' , bookingRoutes);
app.use("/auth" ,authRoutes)
app.use('/pay' ,paymentRoutes); 

connectWithDB();



app.listen(port, () => {
	console.info(`[STATUS] App listening on port ${port}`)
})


