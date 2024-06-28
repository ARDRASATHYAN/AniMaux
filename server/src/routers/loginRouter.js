const express = require('express')
const bcrypt = require ('bcryptjs');
const loginModel = require('../models/loginModel');
const userregModel = require('../models/userregModel');
const docregModel = require('../models/docregModel');
const loginRouter = express.Router()





loginRouter.post ('/login', async function (req, res){
    try{
        console.log(req.body.username);
        const userlog = await loginModel.findOne({ username :req.body.username})
        
        if(!userlog){
            return res.status(400).json({
                success:false,
                error:true,
                message:"username not exit"
            })

        }
        const passwordcheck = await bcrypt.compare(req.body.password,userlog.password)
        console.log(passwordcheck);
        if (passwordcheck){
            console.log('role',userlog.role);
            if(userlog.role==0){
            return res.status(200).json({
                success:true,
                error:false,
                login_id:userlog._id,
                role:userlog.role,
                message:"login successfully"
            })
        }
        if(userlog.role==1){
            const userdata=await userregModel.findOne({login_id:userlog._id})
            return res.status(200).json({
                success:true,
                error:false,
                login_id:userlog._id,
                userId:userdata._id,
                role:userlog.role,
                status:userlog.status,
                message:"login successfully"
            })
        }
        if(userlog.role==2){

            const userdata=await docregModel.findOne({login_id:userlog._id})
            return res.status(200).json({
                success:true,
                error:false,
                login_id:userlog._id,
                userId:userdata._id,
                role:userlog.role,
                status:userlog.status,
                message:"login successfully"
            })
        }
        if(userlog.role==3){
            return res.status(200).json({
                success:true,
                error:false,
                login_id:userlog._id,
                role:userlog.role,
                message:"login successfully"
            })
        }
        }else{
            return res.status(400).json({
                success:false,
                error:true,
                message:"password not match"
            })
        }
    }catch{

    }
})


module. exports = loginRouter

    