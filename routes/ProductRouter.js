const express=require('express')
// const Product = require('../models/Product')
const router=express.Router()

const Product=require('../models/Product')


router.post('/add',async(req,res)=>{
    try{
        const{productName,productPrice,productUnit,productDescription}=req.body
        const productExist=await Product.findOne({productName})
        if(productExist){
            return res.json({status:false,message:'Product Already Exist'})
        }
        const productObj=new Product({productName,productPrice,productUnit,productDescription})
        await productObj.save()
        res.json({
            status:true,
            message:'product add successfuly'
        })

    }
    catch(err){
        res.json({
            status:false,
            message:`Error:${err}`
        })
        res.json({
            status:true,
            message:'product add successfuly'
        })

    }
})

router.get('/get',async(req,res)=>{
    try{

        const result=await Product.find()
        res.json({
            status:true,
            message:result
        })

    }
    catch(err){
        res.json({
            status:false,
            message:`Error:${err}`
        })

    }

})

router.delete('/delete/:id',async (req,res) => {
    try{
        const id=req.params.id
        await Product.findByIdAndDelete(id)
        res.json({
            status:true,
            message:'Product deleted successfuly'
        })

    }
    catch(err){
        res.json({
            status:false,
            message:`Error:${err}`
        })

    }

    
})

router.put('/update/:id',async (req,res) => {
    try{
        const id=req.params.id
        await Product.findByIdAndUpdate(id,req.body,{'new':true})
        res.json({
            status:true,
            message:'Product updated successfuly'
        })

    }
    catch(err){
        res.json({
            status:false,
            message:`Error:${err}`
        })

    }

    
})

module.exports=router



