const express = require('express');
const cors = require('cors');
const path = require('path');


const authRoutes = require('./routes/authRoutes');
const portfolioRoutes = require('./routes/portfolioRoutes')
const analyticsRoutes = require('./routes/analyticsRoutes')


const app = express();
app.use(cors());
app.use(express.json());

app.use('/logos', express.static(path.join(__dirname, 'assets/logos')));
app.use((req,res,next)=>{
    console.log(`${req.method} request on ${req.url}`);
    next();
})

app.use('/',authRoutes)
app.use('/',portfolioRoutes)
app.use('/',analyticsRoutes)

app.get('/',(req,res)=>{
    res.json("Hello from home");
})


app.use((err,req,res,next)=>{
    console.error({'Error':err.message});
    res.status(500).json({error:err.message});
})



module.exports = app;