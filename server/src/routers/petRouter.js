const express = require('express');

const mongoose = require('mongoose');
const addpetModel = require('../models/addpetModel');

const ObjectId = mongoose.Types.ObjectId;

const petRouter = express.Router()


petRouter.post('/pet',async function (req,res){
    try{
        const addpet = {
            user_id:req.body.user_id,
            Category:req.body.Category,
            pet_name:req.body.pet_name,
            breed:req.body.breed,
            age:req.body.age,
            weight:req.body.weight,
            height:req.body.height,
            // dob:req.body.dob,
            // date_of_adopt:req.body.date_of_adopt,
            gender:req.body.gender,
            photo:req.body.photo,
            // color:req.body.color,
            // medical_history:req.body.medical_history,
        }
        const datas = await addpetModel(addpet).save()
        
        if(datas){
           
            return res.status(200).json({
                success:true,
                error:false,
                massege:"add pet completed",
                data:datas,
            })
        }
        
    }catch{
        return res.status(200).json({
            success:false,
            error:true,
            massege:"something wrong",
            data:datas,
        })
        
    }
})


petRouter.get('/viewpet/:ar', async function (req, res) {
    try {
        const login_id=req.params.ar
        console.log("hai",login_id);
        const pet = await addpetModel.aggregate([
        
            {
                '$lookup': {
                    'from': 'userreg_tbs', 
                    'localField': 'user_id', 
                    'foreignField': '_id', 
                    'as': 'user'
                  }
            },
            {
                '$unwind':'$user'
             },
             {
                
                    "$match":{
                        'user_id': new ObjectId(login_id),
                    }
                }, 
                {
                    '$group':{
                        '_id':'$_id',
                    'u_name':{'$first':'$user.u_name'},
                    'u_phone':{'$first':'$user.u_phone'},
                    'u_email':{'$first':'$user.u_email'},
                     'pet_name':{'$first':'$pet_name'},
                  
                     'weight':{'$first':'$weight'},
                     'height':{'$first':'$height'},
                     'Category':{'$first':'$Category'},
                     'photo':{'$first':'$photo'},
                    'breed':{'$first':'$breed'},
                    'age':{'$first':'$age'},
                  
                    'gender':{'$first':'$gender'},
                
                    
                    
                    }
                }
            
          ])
        if (pet[0]!=undefined) {
            return res.status(200).json({
                success: false,
                error: true,
                data: pet,
            })
        }
        else{
            return res.status(400).json({
                success: false,
                error: true,
                message: "no data found",
            })
        }

    } catch {
        return res.status(400).json({
            success: false,
            error: true,
            message: "Something went wrong",
        })
    }

})
module.exports = petRouter; 