const express = require('express')
const mongoose = require('mongoose')
const app =express  ()
const dotenv =require('dotenv')
const userRouter = require('./routes/user')
const adminRouter = require('./routes/admin')
const cors = require('cors')
dotenv.config()


mongoose.connect(process.env.DATABASE_ACCESS,()=>console.log("Database Connected Successfully"))


app.use(express.json())
app.use(cors())
app.use('/',userRouter)
app.use('/admin',adminRouter)

app.listen( 5000,()=>console.log("server running successfully"))