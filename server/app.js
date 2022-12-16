require("dotenv").config();

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const path = require('path')

app.use(cookieParser())
app.use(express.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(cors())
app.use('/images',express.static(path.join(__dirname,'public/images')))

const userRouter = require('./routes/user')
const adminRouter= require('./routes/admin')
const companyRouter = require('./routes/company')
const chatRouter = require('./routes/chatRoute')
const messageRouter = require('./routes/messageRoute')


app.use('/api/',userRouter)
app.use('/api/admin',adminRouter)
app.use('/api/company',companyRouter)
app.use('/api/chat',chatRouter)
app.use('/api/message',messageRouter)


const {connectDb}=require('./config/connection')
connectDb()

const port = process.env.PORT ||5000
app.listen(port,()=>{console.log('server started on port 5000')})

module.exports= app