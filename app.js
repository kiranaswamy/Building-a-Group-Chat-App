const express = require('express');
const app = express();
const cors = require("cors");

const db = require('./util/db-connect')

const userRoutes = require('./routes/userRoutes')

app.use(express.json());
app.use(cors());       


app.get('/',(req,res)=>{
    res.send('server is created')
})

app.use('./user',userRoutes)

db.sync({})
.then(()=>{
    app.listen(3000,()=>{
    console.log('server is running')
})
}).catch((err)=>{
    console.log(err)
})

