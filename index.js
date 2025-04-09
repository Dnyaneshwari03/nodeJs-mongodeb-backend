const express=require('express')
const cors=require('cors')
const bodyParser=require('body-parser')
const mongoose=require('mongoose')
const User=require('./models/User')

const server=express()
server.use(cors())
server.use(bodyParser.json())

mongoose.connect('mongodb+srv://dnyanu:dnyanu%4003@cluster0.gpkysyd.mongodb.net/?retryWrites=true&w=majority&appName=leadSoft').then(()=>
    console.log('DataBase connected')).
catch((err)=>console.log(err))

server.post('/registor',async(req,res)=>{
    try{
        const{fullName,userName,age,password}=req.body
        const userExist=await User.findOne({userName})
        if(userExist){
            return res.json({status:false,message:'User Already Exist'})
        }
        const userObj=new User({fullName,userName,age,password})
        await userObj.save()
        res.json({
            status:true,
            message:'user Registered successfuly'
        })

    }
    catch(err){
        res.json({
            status:false,
            message:`Error:${err}`
        })

    }
})

server.post('/login',async(req,res)=>{
    try{
        const{userName,password}=req.body
        const userExist=await User.findOne({userName})
        if(!userExist){
           return res.json({status:false, message:'User Not Found' })
        }
        if(password!==userExist.password){
            return res.json({status:false, message:'password not match' })
        }
        res.json({
            status:true,
            message:'Login Successful !!'
        })


    }
    catch(err){
        res.json({
            status:false,
            message:`Error:${err}`
        })
    }
})

server.listen(8055,()=>{
    console.log('server Started listining on port 8055');
})
