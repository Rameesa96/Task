const express = require('express')
const router=express.Router();
const multer =require('multer')
const path=require('path')
const product =require('../models/product')
const fs =require('fs');


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
  
        // Uploads is the Upload_folder_name
        cb(null, "uploads")
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })

const upload=multer({storage:storage})

//posting a product

router.post("/post",upload.single('testfield'),async(req,res)=>{
   
const products =new product({
Name:req.body.Name,
Description:req.body.Description,
MRP:req.body.MRP,
Discount:req.body.Discount,
Shippingcharge:req.body.Shippingcharge,
    Image:{
        data: fs.readFileSync("uploads/"+req.file.filename),
        filename:req.file.filename
    },
})

try{
const newproducts =await products.save()
    res.status(200).json(newproducts)
}
catch(err){
    res.status(500).json(err.message)
}
})




//deleteproduct 
router.delete('/delete/:id',async(req,res)=>{
    try{
        const products = await product.findByIdAndDelete(req.params.id)
        res.status(200).json("deleted")
    }
    catch(err){
        res.status(200).json(err.message)
    }
})
module.exports=router


//get each product 
router.get('/getproduct/:id',async(req,res)=>{
    try{
        const products = await product.findById(req.params.id)
        res.status(200).json(products)
    }
    catch(err){
        res.status(200).json(err.message)
    }
})




//edit or update product 
router.put('/edit/:id',async(req,res)=>{
    try{
        const products = await product.findByIdAndUpdate(req.params.id,{$set:{
            Name:req.body.Name,
            Description:req.body.Description,
            MRP:req.body.MRP,
            Discount:req.body.Discount,
            Shippingcharge:req.body.Shippingcharge,
                   
        }})
        res.status(200).json(products)
    }
    catch(err){
        res.status(200).json(err.message)
    }
})
module.exports=router

//add image to product

router.put('/addimage/:id',upload.single('testfield'),async(req,res)=>{
    try{
        const products = await product.findByIdAndUpdate(req.params.id,{$push:{
         
                Image:{
                    data: fs.readFileSync("uploads/"+req.file.filename),
                    filename:req.file.filename
                    
                },
              
        }})
        res.status(200).json(products)
    }
    catch(err){
        res.status(200).json(err.message)
    }
})
module.exports=router


