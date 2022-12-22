const express = require('express')
const mongoose=require('mongoose')
const productrouter = require('./routes/product')
const app = express()
const bodyparser=require('body-parser')


//middlewares
app.use(express.json())
app.use(bodyparser.json())
app.use(express.urlencoded({extended: true}));
app.use('/product',productrouter)



//mongodbconnection
mongoose.connect('mongodb+srv://rami:1234@product.bwuyfeg.mongodb.net/?retryWrites=true&w=majority')
mongoose.connection.on("connected",()=>{
    console.log("mongodb connected")
})
mongoose.connection.on("error",()=>{
    console.log("mongodb disconnected")
})

//serverconnection
app.listen(5000,()=>{
    console.log("server started")
})